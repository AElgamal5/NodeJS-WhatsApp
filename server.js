const express = require("express");
require("dotenv").config();
const { whatsappClient } = require("./services/whatsappClient");
const app = express();

app.use(express.json());
app.use("/whatsapp", require("./routers/message.router"));

app.listen(process.env.PORT || 3000, () => {
  console.log("App listening on port " + process.env.PORT);
});
