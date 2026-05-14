import exp from "express";
import { connect } from "mongoose";
import { userApp } from "./APIs/UsersAPI.js";
import { productApp } from "./APIs/ProductAPI.js";
import cookieParser from "cookie-parser";
import {config} from "dotenv"

config() // process.env.PORT, process.env.DB_URL

const app = exp();
//add body parser
app.use(exp.json());
//add cookie parser middleware
app.use(cookieParser())
//forward rew to UserAPP if path starts with /user-api
app.use("/user-api", userApp);
app.use("/product-api", productApp);

//connect to MongoDB server
async function connectDB() {
  try {
    await connect(process.env.DB_URL);
    console.log("connected to DB");

    //start http server
    const port = process.env.PORT || 4000
    app.listen(port, () => console.log("server is running on port 4000..."));
  } catch (err) {
    console.log("err in DB connection :", err);
  }
}

connectDB();

//error handling middleware
//this middleware executes only if there is an error not for every request like a normal middleware
//when we provide all these arguments then only express treates it as an error handling middleware
app.use((err, req, res, next) => {
  // console.log(err.name);
  // console.log(err.message)
  // console.log(err.code)
  //validation error
  if (err.name === "ValidationError") {
    res.status(400).json({ message: "Validation error", error: err.message });
  } 
  //CastError
  if(err.name === "CastError"){
    res.status(400).json({ message: "CastError error", error: err.message });
  }

  //send server side error
  res.status(500).json({ message: "Server side error", error: err.message });
});

//error => {name, message, callstack}