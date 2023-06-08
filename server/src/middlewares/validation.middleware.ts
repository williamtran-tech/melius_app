import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import * as express from "express";
import HttpException from "../exceptions/HttpException";

function validationMiddleware<T>(
  type: any,
  skipMissingProperties: false
): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToInstance(type, req.body)).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => {
            return Object.values(error.constraints!).join(", ").toString();
          });
          next(new HttpException(400, message.toString()));
        } else {
          next();
        }
      }
    );
  };
}

export default validationMiddleware;
