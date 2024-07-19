import type { Server } from "node:http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.router";
import favouritesRouter from "./routes/favourites.router";
config();

const app: Application = express();

mongoose
  .connect(process.env.MONGO_CONNECTION as string)
  .then(() => console.log("mongoose services connected!"))
  .catch((err: unknown) => console.log("some error occured: ", err));

app.use(
  cors({
    origin: "https://movielib-client.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/favourites", favouritesRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ success: "MovieLib server accessed!" });
});

const PORT = process.env.PORT || 8080;
const server: Server = app.listen(PORT, () =>
  console.log(`server on port http://localhost:${PORT}`)
);
