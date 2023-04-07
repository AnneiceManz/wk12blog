const express = require("express");
const { register, login, logout } = require("../controllers/auth.js");

const router = express.Router();

// post request for when new user signs up

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;