const express = require("express");
const LoginController = require("../controller/loginController");
// create router
const router = express.Router();

// define routes
router.get("/", LoginController.getLogin);

module.exports = router;
