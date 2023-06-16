import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/HttpException";
import { JsonWebTokenError } from "jsonwebtoken";

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || "Server Error";
  if (error instanceof JsonWebTokenError) {
    res.status(401).json({
      message: "Invalid token",
    });
  } else {
    res.status(status).json({
      message,
    });
  }
}

export default errorMiddleware;
