// we  mak  the  express  application  here  so  everything  can  start  up
import exp from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { userApp } from './APIs/UserAPI.js';
import { authorApp } from './APIs/AuthorAPI.js';
import { adminApp } from './APIs/AdminAPI.js';
import { commonApp } from './APIs/CommonAPI.js';
import cookieParser from 'cookie-parser';
import cors from "cors"

//  load  the  secret  env  settings  from  the  file
config();
const app = exp()

//  allow  the  frontend  to  talk  to  dis  server  without  cors  error
app.use(cors({
  origin: "https://blogapp-three-cyan.vercel.app",
  credentials: true,
}));


//  connect  to  the  magic  mongodb  database  in  the  cloud
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("connected to database");
  }
  catch (err) {
    console.log("error in db connection", err);
  }
}

connectDB();



//  middleman  for  parse  the  json  body  from  the  request
app.use(exp.json());
//  middleman  for  read  the  secret  cookies
app.use(cookieParser())

//  assign  the  paths  for  different  api  portals
app.use('/user-api', userApp);
app.use('/author-api', authorApp);
app.use('/admin-api', adminApp);
app.use('/auth', commonApp);



//  if  user  go  to  bad  url  we  show  dis  invalid  path  message
app.use((req, res, next) => {
  console.log(req.url)
  res.status(404).json({ message: `path ${req.url} is invalid` })
})

//  last  bouncer  for  handle  any  bad  error  that  happen  in  code
app.use((err, req, res, next) => {
  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Error cause:", err.cause);
  console.log("Full error:", JSON.stringify(err, null, 2));

  //  if  data  is  not  valid  according  to  skeleton
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message
    });
  }

  //  if  id  is  badly  format
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  //  if  same  data  try  to  save  twice
  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];

    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`
    });
  }

  //  if  something  really  bad  happen  on  server  side
  res.status(500).json({
    message: "error occurred",
    error: "Server side error"
  });
});

//  start  the  listener  on  the  magic  port  hole
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => console.log(`server started on port ${port}`));
