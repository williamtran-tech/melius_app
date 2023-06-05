import express, { Application } from "express";
import morgan from "morgan";
import * as cors from "cors";
import helmet from "helmet";
import session from "express-session";
import { routes } from "./v1/routes/index";
import { connectDB } from "./../src/configs/db.config";
import passport from "passport";

class App {
  public app: Application;
  public port: number | string;

  constructor(port: number | string) {
    this.app = express();
    this.port = port;

    this.connectDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(morgan("tiny"));
    this.app.use(cors.default());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      session({
        resave: false,
        saveUninitialized: true,
        secret: "SECRET",
      })
    );
    // Passport middleware
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private initializeRoutes() {
    this.app.use("/api/v1", routes);
  }

  private connectDatabase() {
    connectDB();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
