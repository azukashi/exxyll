const RPC = require("discord-rpc");
const rpc = new RPC.Client({ transport: "ipc" });
const client = require("../index");
const prefix = require("../config.json").prefix;
const clientId = "818884394416603161";
const scopes = ["rpc", "rpc.api", "messages.read"];

rpc.on("ready", () => {
  rpc.setActivity({
    details: "Exxyll Discord Bot || Type .help",
    state: "A Multipurpose Discord Bot",
    startTimestamp: new Date(),
    largeImageKey: "exxyll",
    largeImageText: "Exxyll",
    smallImageKey: "exxyll_v1",
    smallImageText: "Release v1.0.1",
    buttons: [
      {
        label: "Invite Me",
        url: "https://discord.com/oauth2/authorize?client_id=848232775798226996&permissions=3222646&scope=bot",
      },
      { label: "Visit Website", url: "https://exxyll.github.io" },
    ],
  });

  console.log("RPC Online!");
});

rpc.login({ clientId, scopes });
