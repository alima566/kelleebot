module.exports = {
  name: "discord",
  category: "Moderation",
  description: "Ramen's discord server invite link.",
  channel: "ramenbomber_",
  isModOnly: true,
  execute: ({ client, channel }) => {
    return client.say(
      channel,
      `/me Come hang out at The Ramen Shop Discord! https://discord.gg/Nkt3KXv`
    );
  },
};
