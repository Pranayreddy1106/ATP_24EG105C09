// mak express app
import exp from 'express'
import { connect } from 'mongoose'
import { config } from 'dotenv'
import { userApp } from './APIs/UserAPI.js';
import { authorApp } from './APIs/AuthorAPI.js';
import { adminApp } from './APIs/AdminAPI.js';
import { commonApp } from './APIs/CommonAPI.js';
import cookieParser from 'cookie-parser';
import cors from "cors"

config();
const app = exp()

app.use(cors({
  origin: "https://blogapp-three-cyan.vercel.app",
  credentials: true,
}));


// put port

// link to db
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



// body parser 
app.use(exp.json());
app.use(cookieParser())

// routes here
app.use('/user-api', userApp);
app.use('/author-api', authorApp);
app.use('/admin-api', adminApp);
app.use('/auth', commonApp);



// bad path here
app.use((req, res, next) => {
  console.log(req.url)
  res.status(404).json({ message: `path ${req.url} is invalid` })
})

// handle error here [END OF FILE]
app.use((err, req, res, next) => {
  console.log("Error name:", err.name);
  console.log("Error code:", err.code);
  console.log("Error cause:", err.cause);
  console.log("Full error:", JSON.stringify(err, null, 2));

  // Validation bad
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message
    });
  }

  // Cast bad
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "error occurred",
      error: err.message
    });
  }

  const errCode = err.code ?? err.cause?.code ?? err.errorResponse?.code;
  const keyValue = err.keyValue ?? err.cause?.keyValue ?? err.errorResponse?.keyValue;

  // Double key bad
  if (errCode === 11000) {
    const field = Object.keys(keyValue)[0];
    const value = keyValue[field];

    return res.status(409).json({
      message: "error occurred",
      error: `${field} "${value}" already exists`
    });
  }

  // Server dead
  res.status(500).json({
    message: "error occurred",
    error: "Server side error"
  });
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => console.log(`server started on port ${port}`));
