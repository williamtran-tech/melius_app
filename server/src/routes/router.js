const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => 
    res.status(200).json({
    "Users list": "all users"
    })
);

module.exports = router;
