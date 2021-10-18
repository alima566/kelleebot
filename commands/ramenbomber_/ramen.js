module.exports = {
  name: "ramen",
  category: "ramenbomber_",
  description: "Did someone say MARIO?!",
  cooldown: 15,
  globalCooldown: true,
  channel: ["ramenbomber_", "krisypaulinee"],
  execute: ({ client, channel }) => {
    return client.say(
      channel,
      `/me Ayo! Ramen has a new YouTube video! Let's check it out https://www.youtube.com/watch?v=nTYYK67jHeA`
    );
  },
};
