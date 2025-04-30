import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import connectDB from "./db/connectDB";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import userRoute from "./routes/user.route";
import restaurantRoute from "./routes/restaurant.route";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

//Default middlewares for any MERN Project
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: `${process.env.FRONTEND_URL}`,
  credentials: true,
};
app.use(cors(corsOptions));

//default route

app.get("/", (req: Request, res: Response) => {
  res.send("server is running🎉🎉");
});

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);

//listening to the server
app.listen(port, () => {
  console.log(`server started on ${port}`);
  connectDB();
});
