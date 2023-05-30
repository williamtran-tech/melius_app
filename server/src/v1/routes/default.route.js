"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRouter = void 0;
const express_1 = require("express");
exports.defaultRouter = (0, express_1.Router)();
exports.defaultRouter.get("/", (req, res) => {
    res.send("This is default route");
});
