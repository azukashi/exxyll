const fetch = require("node-fetch");

module.exports = (client) => {
  client.on("message", async (message) => {
    if (message.channel.id === "869763459561173032") {
      if (message.author.bot) return;
      if (!message.author.bot) {
        fetch(
          `https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(
            messsage.content
          )}&uid=${message.author.id}`
        )
          .then((res) => res.json())
          .then((body) => {
            message.lineReply(body.response);
          });
      }
    }
  });
};
