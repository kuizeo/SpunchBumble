module.exports = function (data, interaction) {
  const footer = {
  //  text: `Provided by ${interaction.user.tag} | https://songbirb.gg`,
  //  iconURL: interaction.user.avatarURL(),
  };

  return {
    title: data.name,
    description: data.desc,
    footer,
    ...data, // extraneous data passed to the function, like images
  };
};
