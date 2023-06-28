import express, { NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import HttpException from "../exceptions/HttpException";
import DataStoredInToken from "../interfaces/Auth/DataStoredInToken.interface";
import { User } from "../orm/models/user.model";

async function authMiddleware(
  request: express.Request,
  response: express.Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET!;
    try {
      const decodedToken = jwt.verify(
        cookies.Authorization,
        secret
      ) as DataStoredInToken;
      const id = decodedToken.id;
      const user = await User.findByPk(id);
      if (user) {
        request.userData = decodedToken;
        next();
      } else {
        next(new HttpException(401, "Unauthorized Access"));
      }
    } catch (error) {
      next(new HttpException(401, "Unauthorized Access"));
    }
  } else {
    next(new HttpException(401, "Unauthorized Access"));
  }
}

export default authMiddleware;
