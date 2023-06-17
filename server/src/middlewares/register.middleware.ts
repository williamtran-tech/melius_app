import { NextFunction, Response, Request } from "express";
import HttpException from "../exceptions/HttpException";

async function registerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookie = req.cookies;
  if (cookie && cookie.Authorization) {
    next(new HttpException(400, "You already logged in"));
  } else {
    next();
  }
}

export default registerMiddleware;
