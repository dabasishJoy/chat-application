// external imports
const express = require("express");
const { check } = require("express-validator");

// internal imports
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/userController");
const decorateHtmlResponse = require("../middleware/common/decorateHtmlResponse");
const avatarUpload = require("../middleware/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middleware/users/usersValidator");

const router = express.Router();

// users page
router.get("/", decorateHtmlResponse("Users"), getUsers);

// add user
router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", removeUser);

module.exports = router;
