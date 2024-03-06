const { Client, LocalAuth } = require("whatsapp-web.js");
const qrCode = require("qrcode-terminal");

let whatsappClient = new Client({
  authStrategy: new LocalAuth(),
  clientId: "client-one",
});

whatsappClient.initialize();

function whatsappClientRecreate() {
  console.log("Before recreating the client");
  // whatsappClient = null;
  // setTimeout(() => {
  // whatsappClient = new Client({
  //   authStrategy: new LocalAuth(),
  // });
  // whatsappClient.initialize();
  // }, 1000);

  whatsappClient.resetState();

  console.log("After recreating the client");
}

whatsappClient.on("qr", (qr) => {
  qrCode.generate(qr, { small: true });
});

whatsappClient.on("ready", () => console.log("whatsappClient IS READY"));

whatsappClient.on("message", async (msg) => {
  try {
    if (msg.from != "status@broadcast") {
      const contact = await msg.getContact();
      console.log("contact:", contact);
      console.log("msg.from:", msg.from);
      console.log("msg.body:", msg.body);
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
