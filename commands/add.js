module.exports = {
  name: "add",
  desc: "Adds a shitpost (video or image) to the database.",
  args: ["post:The image, video, or audio to add.:Attachment"],
  exec: add,
  perm: 0,
};

const e = require("../embed");
const got = require("got");

const util = require("node:util");
const fs = require("node:fs");

const stream = require("node:stream");
const pipeline = util.promisify(stream.pipeline);

function error(desc) {
  let embed = e({ name: "Error!", desc });
  return interaction.reply({ embed });
}

async function add(interaction) {
  const attachment =  interaction.options._hoistedOptions[0].attachment;
  let id = attachment.id, url = attachment.url, type = attachment.contentType;

  let embed = e({ name: "Success!", desc: "Added to the database." });
  let exts = { image: "png", video: "mp4", audio: "mp3" }; // just for embed

  await pipeline(
    got.stream(url),
    fs.createWriteStream(`./database/${id}.${exts[type.split("/")[0]]}`),
  );

  interaction.reply({ embeds: [embed] });
}
