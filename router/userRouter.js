const express = require("express");
const UserController = require("../controller/userController");
const avatarUpload = require("../middleware/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middleware/users/usersValidator");
// create router
const router = express.Router();

// define routes
router.get("/", UserController.getUsers);

// create user
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  UserController.addUser
);

module.exports = router;
