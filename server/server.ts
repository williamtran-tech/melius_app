import App from "./src/app";
import dotenv from "dotenv";

dotenv.config();

console.log("Development mode: ", process.env.ENV);
const PORT = process.env.PORT || 5050;
const app = new App(PORT);
app.listen();
