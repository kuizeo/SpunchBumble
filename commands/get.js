module.exports = {
  name: "get",
  desc: "Gets a shitpost from the database.",
  args: [],
  exec: init,
  perm: 0,
};

const util = require("node:util");
const fs = require("node:fs");

const Discord = require("discord.js");
const readdir = util.promisify(fs.readdir);

async function init(interaction) {
  const array = await readdir("./database");
  const item = array[Math.floor(Math.random() * array.length)];

  const file = new Discord.MessageAttachment(`./database/${item}`);
  interaction.reply({ files: [file] });
}
