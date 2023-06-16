import { Router } from "express";
import MailUtil from "../../utils/mail.util";

export const defaultRouter = Router();

defaultRouter.get("/", (req, res) => {
  res.send("This is default route");
});
