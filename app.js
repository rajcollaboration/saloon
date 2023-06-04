import  Express  from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/auth.js";
import saloonRouter from "./routes/saloon.js";
dotenv.config();

const app = Express();

app.use(Express.json());

app.use(cookieParser());

const port = 8800 || process.env.PORT;
const connect = () =>{
    mongoose.connect(process.env.MONGO).then(() => {
        console.log("Connected to DB");
    }).catch((err) => {
        console.log(err);
    });
}

// Routes

app.use("/api/user",userRouter);
app.use("/api/auth",authRouter);
app.use("/api/saloon",saloonRouter);

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
      success: false,
      status,
      message,
    });
  });

app.listen(port, ()=>{
    connect();
    console.log("Connected to Server");
});