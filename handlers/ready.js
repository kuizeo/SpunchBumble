module.exports = {
  name: "ready",
  exec: onReady,
};

const debug = false;
const guild = debug ? "955687783555538974" : false;

const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

async function onReady(client) {
  const commands = require("fs").readdirSync("./commands").map(handleCommand);
  const rest = new REST({ version: "9" }).setToken(client.token);

  await handleCommands(commands, rest, client);
}

function handleCommand(file) {
  const command = require(`../commands/${file}`);
  let data = new SlashCommandBuilder()
    .setName(command.name)
    .setDescription(command.desc);

  for (const option of command.args) data = handleOption(option, data);
  return data.toJSON();
}

function handleOption(option, data) {
  let parts = option.split(":");
  console.log(option);

  let name = parts[0];
  let desc = parts[1];
  let type = parts[2];
  let func = `add${type}Option`;

  data[func]((opt) => opt.setName(name).setDescription(desc).setRequired(true));
  return data;
}

async function handleCommands(body, rest, client) {
  const args = guild ? [client.application.id, guild] : [client.application.id];
  const func = guild ? "applicationGuildCommands" : "applicationCommands";

  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(Routes[func](...args), { body });
    console.log("Successfully reloaded application (/) commands.");
  } catch (e) {
    // TODO: Send to an endpoint
    console.error(e);
  }
}
