import exp from "express";
import { connect } from "mongoose";
import { empRoute } from "./API/empApp.js";
import { config } from "dotenv";
import cors from "cors";
config();

const app = exp();
//add cors middleware
console.log("Applying CORS middleware with wildcard origin");
app.use(
  cors({
    origin: "https://empapp-khaki.vercel.app",
  }),
);

//body parser middleware
app.use(exp.json());
//emp api middleware
app.use("/emp-api", empRoute);

//DB connection
const connectDB = async () => {
  try {
    await connect(process.env.DB_URL);
    console.log("DB connected");
    let port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`server listening on port ${port}..`));
  } catch (err) {
    console.error("CRITICAL ERROR: Database connection failed!");
    console.error("Reason:", err.message);
    process.exit(1); // Force the app to crash with an error code so Render logs it!
  }
};

connectDB();

//error handling middleware
app.use((err, req, res, next) => {
  console.log("err in middleware:", err.message);

  res.status(err.status || 500).json({
    message: "error",
    reason: err.message,
  });
});
