// import express, { Express, Request, Response } from "express";
// import dotenv from "dotenv";

// import { connectDB } from "./src/configs/db.config";
// import { routes } from "./src/v1/routes/index";

// // Connect Db
// dotenv.config();
// connectDB();

// // Setup server
// const PORT = process.env.PORT || 5050;
// const app: Express = express();

// console.log(process.env.PORT);
// app.use(express.json());

// // Routes
// app.use("/api/v1", routes);

// // Start the server
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:${PORT}`)
// );

import dotenv from "dotenv";
import App from "./src/app";
import { connectDB } from "./src/configs/db.config";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5050;
const app = new App(PORT);

app.listen();
