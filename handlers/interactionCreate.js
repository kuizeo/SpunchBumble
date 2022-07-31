module.exports = {
  name: "interactionCreate",
  exec: onInteractionCreate,
};

const fs = require("fs");

function onInteractionCreate(interaction) {
  if (!interaction.isCommand()) return;

  const command = require(`../commands/${interaction.commandName}`);
  command.exec(interaction);
}
