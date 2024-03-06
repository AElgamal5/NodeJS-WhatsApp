const express = require("express");
const router = express.Router();
const {
  whatsappClient,
  whatsappClientRecreate,
} = require("../services/whatsappClient");

router.post("/send", async function (req, res) {
  try {
    if (!req.body.message || !req.body.phoneNumber) {
      return res
        .status(422)
        .json({ errors: "PhoneNumber and message must be provided" });
    }
    let status = await whatsappClient.getState();
    console.log(status);
    if (!status) {
      return res
        .status(400)
        .json({ errors: "Please connect scan qr code first" });
    }

    await whatsappClient.sendMessage(req.body.phoneNumber, req.body.message);
    res.json({ msg: "Your message has been sent successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/status", async function (req, res) {
  try {
    let status = await whatsappClient.getState();
    res.json({ status: status || "NOT CONNECTED" });
  } catch (error) {
    console.log(error);
    res.json({ status: "NOT CONNECTED" });
  }
});

router.get("/logout", async function (req, res) {
  try {
    let status = await whatsappClient.getState();

    if (!status) {
      return res.status(400).json({ errors: "You are not connected" });
    }

    // await whatsappClient.destroy();
    await whatsappClient.logout();

    // whatsappClientRecreate();

    await whatsappClient.resetState();

    res.json({ msg: "You logged out successfully" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
