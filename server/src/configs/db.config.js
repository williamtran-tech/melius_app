"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = () => {
    console.log("Connecting to database...");
    mongoose_1.default.Promise = global.Promise;
    mongoose_1.default.connect(process.env.ATLAS_URI, {
        dbName: "melius_db",
    }).then(() => {
        console.log("Successfully connected to database");
    }).catch((err) => {
        console.log("Could not connect to database...", err);
        process.exit();
    });
};
exports.connectDB = connectDB;
