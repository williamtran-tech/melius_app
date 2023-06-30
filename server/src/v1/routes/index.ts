import express from "express";
import { defaultRouter } from "./default.route";
import { userRouter } from "./user.route";
import { authRouter } from "./auth.route";
import { ingredientRouter } from "./ingredient.route";

export const routes = express.Router();
routes.use("/", defaultRouter);
routes.use("/users", userRouter);
routes.use("/auth", authRouter);
routes.use("/ingredients", ingredientRouter);
