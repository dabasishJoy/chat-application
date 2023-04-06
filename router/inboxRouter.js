const express = require("express");
const InboxController = require("../controller/inboxController");
// create router
const router = express.Router();

// define routes
router.get("/", InboxController.getInbox);

module.exports = router;
