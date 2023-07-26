import App from "./src/app";
import dotenv from "dotenv";

dotenv.config({
    path: "environments/.env.development"
});

console.log("Development mode: ", process.env.STATUS);
let PORT;
process.env.STATUS === 'production' ? (PORT = process.env.PROD_PORT) : (PORT = process.env.DEV_PORT);
console.log("Port ", PORT);
const app = new App(PORT || 5050);
app.listen();
