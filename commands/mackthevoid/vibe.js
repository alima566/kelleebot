module.exports = {
  name: "vibe",
  category: "mackthevoid",
  cooldown: 15,
  channel: "mackthevoid",
  execute: ({ client, channel }) => {
    return client.say(
      channel,
      `/me Sending hugs and positive vibes to everyone here - You are worth it`
    );
  },
};
