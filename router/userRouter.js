const express = require("express");
const UserController = require("../controller/userController");
// create router
const router = express.Router();

// define routes
router.get("/", UserController.getUsers);

module.exports = router;
