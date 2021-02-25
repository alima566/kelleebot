module.exports = {
  name: "fc",
  aliases: ["friendcode"],
  category: "ramenbomber_",
  description: "Shows ramenbomber's Switch friend code.",
  cooldown: 15,
  globalCooldown: true,
  channel: "ramenbomber_",
  execute: ({ client, channel }) => {
    return client.say(channel, `/me SW-7337-4574-0022`);
  },
};
