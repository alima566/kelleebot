module.exports = {
  name: "commands",
  aliases: ["cmd", "cmds"],
  category: "Multiple",
  description: "Lists out all the commands a channel has.",
  cooldown: 15,
  channel: ["ramenbomber_", "mackthevoid"],
  execute: ({ client, channel }) => {
    const commands = [];
    const channelName = channel.slice(1).toLowerCase();
    const channelInfo = client.channelInfoCache.get(channelName);
    const commandsArr = channelInfo.commands;
    for (const cmd of commandsArr) {
      commands.push(`${channelInfo.prefix}${cmd}`);
    }

    return client.say(channel, `/me ${commands.sort().join(", ")}`);
  },
};
