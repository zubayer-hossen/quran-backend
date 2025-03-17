const express = require("express");
const { registerParticipant } = require("../controllers/registrationController");

const router = express.Router();

router.post("/something", registerParticipant);

module.exports = router;
