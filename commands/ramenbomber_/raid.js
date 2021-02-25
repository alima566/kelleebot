module.exports = {
  name: "raid",
  category: "ramenbomber_",
  description: "Shows ramenbomber's raid message.",
  cooldown: 15,
  channel: "ramenbomber_",
  execute: ({ client, channel }) => {
    return client.say(channel, `/me ramenb2Pichu ramenb2Pichu Ramen Raid!`);
  },
};
