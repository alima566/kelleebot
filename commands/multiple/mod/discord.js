const { invites } = require("@utils/discordInvites");

module.exports = {
  name: "discord",
  category: "Moderation",
  description: "Ramen's discord server invite link.",
  channel: ["ramenbomber_", "jkirstyn"],
  isModOnly: true,
  execute: ({ client, channel }) => {
    const channelName = channel.slice(1).toLowerCase();
    const discord = invites[channelName];

    return client.say(channel, `/me ${discord}`);
  },
};
