import express, { NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import { User } from "../orm/models/user.model";

async function checkKidIDMiddleware(
  request: express.Request,
  response: express.Response,
  next: NextFunction
) {
  const parentId = request.userData.id;

  const kidId = await User.findAll({
    where: {
      parentId: parentId,
    },
    attributes: ["id"],
  });
  var flag = false;

  for (const id in kidId) {
    if (Number(request.body.kidId) === kidId[id].id) {
      flag = true;
    } else if (Number(request.query.kidId) === kidId[id].id) {
      flag = true;
    }
  }
  if (flag) {
    next();
  } else next(new HttpException(404, "Kid not found"));
}

export default checkKidIDMiddleware;
