const express = require("express");
const router = express.Router();

const {
  sendContriReq,
  acceptContribution,
  getMyProjectContributions,
  rejectContribution,
} = require("../Controllers/contriController");

const LoggedInOnly = require("../Middlewares/LoggedInOnly");

router.post("/request", LoggedInOnly, sendContriReq);
router.post("/accept", LoggedInOnly, acceptContribution);
router.get("/my-projects", LoggedInOnly, getMyProjectContributions);
router.post("/reject", LoggedInOnly, rejectContribution);

module.exports = router;
