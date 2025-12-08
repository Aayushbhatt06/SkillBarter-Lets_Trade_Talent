const router = require("express").Router();
const LoggedInOnly = require("../Middlewares/LoggedInOnly");
const { loadMessages } = require("../Controllers/Socket/ChatController");

router.post("/loadmsg", LoggedInOnly, loadMessages);

module.exports = router;
