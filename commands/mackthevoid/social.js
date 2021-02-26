module.exports = {
  name: "social",
  aliases: ["socials"],
  category: "mackthevoid",
  description: "Shows Mack's Twitter handle.",
  cooldown: 15,
  channel: "mackthevoid",
  execute: ({ client, channel }) => {
    return client.say(channel, `/me Twitter: https://twitter.com/voidmack`);
  },
};
