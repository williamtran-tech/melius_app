import * as express from "express";
import { ValidationError } from "class-validator";
import HttpException from "../exceptions/HttpException";

function formDataValidationMiddleware(validationRules: Record<string, any>): express.RequestHandler {
  return (req, res, next) => {
    console.log("Req body: ", req.body);
    
    // Validate each field in the form data based on provided validation rules
    const validationErrors: ValidationError[] = [];

    for (const key in validationRules) {
      if (Object.prototype.hasOwnProperty.call(validationRules, key)) {
        const value = req.body[key];
        const validationRule = validationRules[key];

        if (validationRule instanceof Function && !validationRule(value)) {
          validationErrors.push({
            target: req.body,
            value,
            property: key,
            children: [],
            constraints: {
              customValidation: `Validation failed for ${key}`,
            },
          });
        }
      }
    }

    if (validationErrors.length > 0) {
      console.log(validationErrors);
      const message = validationErrors.map((error: ValidationError) => {
        return Object.values(error.constraints!).join(", ").toString();
      });
      next(new HttpException(400, message.toString()));
    } else {
      next();
    }
  };
}

export default formDataValidationMiddleware;
