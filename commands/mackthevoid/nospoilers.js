module.exports = {
  name: "nospoilers",
  aliases: ["blind"],
  category: "mackthevoid",
  cooldown: 15,
  channel: "mackthevoid",
  execute: ({ client, channel }) => {
    return client.say(
      channel,
      `/me Hi, welcome in new friends! PridePog This is a blind playthrough, so please refrain from spoilers!! Thank you!! PrideRise`
    );
  },
};
