module.exports = {
  name: "yt",
  aliases: ["youtube"],
  category: "ramenbomber_",
  description: "Links you to Ramen's YouTube channel.",
  channel: "ramenbomber_",
  cooldown: 15,
  execute: ({ client, channel }) => {
    return client.say(
      channel,
      "/me Check out my YouTube channel! https://www.youtube.com/channel/UCvlfWdqmcPMcRwyPv4TEdHA"
    );
  },
};
