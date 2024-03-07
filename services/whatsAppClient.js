const { Client, LocalAuth } = require("whatsapp-web.js");
const qrCode = require("qrcode-terminal");

let whatsappClient = new Client({
  authStrategy: new LocalAuth(),
  clientId: "client-one",
});

whatsappClient.initialize();

async function whatsappClientRecreate() {
  console.log("REINITIALIZE whatsappClient ......");

  await whatsappClient.initialize();

  console.log("whatsappClient REINITIALIZED SUCCESSFULLY");
}

whatsappClient.on("qr", (qr) => {
  qrCode.generate(qr, { small: true });
});

whatsappClient.on("ready", () => console.log("whatsappClient IS READY"));

whatsappClient.on("message", async (msg) => {
  try {
    if (msg.from != "status@broadcast") {
      const contact = await msg.getContact();
      // console.log("contact:", contact);

      console.log("MSG RECEIVED");
      console.log("MSG FROM: ", msg.from);
      console.log("MSG BODY: ", msg.body);
      console.log("=======================");
    }
  } catch (error) {
    console.error(error);
  }
});

whatsappClient.on("disconnected", () =>
  console.log("whatsappClient IS DISCONNECTED")
);

whatsappClient.on("loading_screen", (percent, message) => {
  console.log("whatsappClient LOADING SCREEN", percent, message);
});

whatsappClient.on("authenticated", () => {
  console.log("whatsappClient AUTHENTICATED");
});

whatsappClient.on("auth_failure", (msg) => {
  // Fired if session restore was unsuccessful
  console.error("whatsappClient AUTHENTICATION FAILURE", msg);
});

module.exports = { whatsappClient, whatsappClientRecreate };
