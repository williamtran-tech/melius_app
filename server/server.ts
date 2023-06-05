import App from "./src/app";

const PORT = process.env.PORT || 5050;
const app = new App(PORT);

app.listen();
