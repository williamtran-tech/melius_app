import express from "express";
import { BaseController } from "./abstractions/baseController";

export default class UserController extends BaseController {
  public path = "/users";

  constructor() {
    super();
  }

  public getAllUsers(req: express.Request, res: express.Response): void {
    res.send("This is user route");
  }
}
