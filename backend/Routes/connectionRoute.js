const router = require("express").Router();
const {
  conReq,
  conReject,
  conAccept,
  fetchConReq,
  fetchConnections,
} = require("../Controllers/ConnectionController");
const LoggedInOnly = require("../Middlewares/LoggedInOnly");

router.post("/request", LoggedInOnly, conReq);
router.post("/accept", LoggedInOnly, conAccept);
router.post("/reject", LoggedInOnly, conReject);
router.get("/fetchreq", LoggedInOnly, fetchConReq);
router.post("/fetchcon", LoggedInOnly, fetchConnections);

module.exports = router;
