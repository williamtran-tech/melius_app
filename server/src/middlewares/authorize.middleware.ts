import { Request, Response, NextFunction } from "express";
import HttpException from "../exceptions/HttpException";
import { Role } from "../orm/models/role.model";
import { UserRole } from "../orm/models/user.role.model";

export const authorize = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //Get the user ID from previous midleware
      const id = req.userData.id;

      //Get user role from the database
      const userRoles = await UserRole.findOne({
        where: {
          userId: id,
        },
        attributes: ["roleId"],
      });

      const roleNames = await Role.findAll({
        where: {
          id: userRoles?.roleId,
        },
        attributes: ["name"],
      });

      let authorized = false;

      roleNames?.forEach((role) => {
        if (roles.includes(role.name)) {
          authorized = true;
        }
      });
      if (!authorized) {
        next(new HttpException(401, "Unauthorized Access"));
      } 
      next();
    } catch (err) {
      next(err);
    }
  };
};
