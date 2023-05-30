import express from "express";
import { defaultRouter } from "./default.route";
import { userRouter } from "./user.route";

export const routes = express.Router();
routes.use("/", defaultRouter);
routes.use("/users", userRouter);
