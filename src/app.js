import express from "express";
import { userRouter } from "./routers/users.router.js";
import { repairRouter } from "./routers/repairs.router.js";

export const app = express();

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/repairs", repairRouter);