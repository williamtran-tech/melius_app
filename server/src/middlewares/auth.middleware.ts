import { NextFunction, Response, Request } from "express";
import * as jwt from "jsonwebtoken";
import HttpException from "../exceptions/HttpException";
import DataStoredInToken from "../interfaces/DataStoredInToken.interface";
import { User } from "../orm/models/user.model";

async function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret = process.env.JWT_SECRET!;
    try {
      const verificationResponse = jwt.verify(
        cookies.Authorization,
        secret
      ) as DataStoredInToken;
      const id = verificationResponse.id;
      const user = await User.findByPk(id);
      if (user) {
        request.user = user;
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
