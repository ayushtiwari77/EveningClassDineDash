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
import orderRoute from "./routes/order.route";
import menuRoute from "./routes/menu.route";
import path from "path";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const DIRNAME = path.resolve();

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

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

//joining frontend
app.use(express.static(path.join(DIRNAME, "/client/dist")));
app.use((req, res, next) => {
  // If the request path starts with /api, let it fall through to other API handlers
  // or eventually to a 404 handler if no API route matches.
  if (req.path.startsWith("/api")) {
    return next();
  }

  // For all other requests (that are not /api and not static files),
  // serve the index.html from your client build.
  res.sendFile(path.resolve(DIRNAME, "client", "dist", "index.html"));
});
//listening to the server
app.listen(port, () => {
  console.log(`server started on ${port}`);
  connectDB();
});
