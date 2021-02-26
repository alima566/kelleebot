module.exports = {
  name: "positive",
  category: "mackthevoid",
  cooldown: 15,
  channel: "mackthevoid",
  execute: ({ client, channel }) => {
    return client.say(
      channel,
      `/me Positive energy swirls through the air... A gentle voice begins to whisper... "You are amazing! You are worth it - YOU MATTER! I believe in you"`
    );
  },
};
