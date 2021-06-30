const { chatBot } = require("reconlx");
const client = require("../index");

client.on("message", async (message) => {
  if (message.channel.id === "859694280826159175") {
    chatBot(message, message.content);
  }
});
