import exp from "constants";
import { Router } from "express";

export const defaultRouter = Router();

defaultRouter.get("/", (req, res) => {
  res.send("This is default route");
});
