const Discord = require("discord.js");
const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildVoiceStates,
    Discord.GatewayIntentBits.Guilds,
  ],
});

require("fs").readdir("./handlers", (err, files) => {
  for (const file of files) {
    let handler = require(`./handlers/${file}`);
    client.on(handler.name, handler.exec);
  }

  console.log("Registered events!");
});

client.login("token");
