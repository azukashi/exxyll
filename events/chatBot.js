const { chatBot } = require("reconlx");

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.channel.id === "859694280826159175") {
      chatBot(message, message.content);
    }
  });
};
