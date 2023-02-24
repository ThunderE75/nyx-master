const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "poll",
  description: "Start a poll in a channel",
  category: "Utilities",
  type: "CHAT_INPUT",
  options: [
    {
      type: 3,
      name: "description",
      description: "The description of the poll",
      required: true,
    },
    {
      type: 7,
      name: "channel",
      description: "The channel you want to send the poll",
      required: false,
      channelTypes: ["GUILD_TEXT"],
    },
  ],
  run: async (client, interaction, args) => {
    await interaction.deleteReply();
    const pollDescription = `
      ${interaction.member} asks: ${args[0]}`;
    const channel =
      interaction.guild.channels.cache.get(args[1]) || interaction.channel;
    const embedPoll = new MessageEmbed()
      .setTitle(`${interaction.user.tag} made a poll`)
      .setDescription(pollDescription)
      .setFooter(`Made by ${client.author}`, client.user.displayAvatarURL())
      .setTimestamp()
      .setColor("GREEN");
    const msgEmbed = await channel.send({ embeds: [embedPoll] });
    await msgEmbed.react("👍");
    await msgEmbed.react("👎");
  },
};
