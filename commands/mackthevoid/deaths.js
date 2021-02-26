const { getDeathCount } = require("@utils/dbHelpers/deaths");
const { getGame } = require("@utils/functions");

module.exports = {
  name: "deaths",
  category: "mackthevoid",
  description: "Tells you how many times Mack has died for a game.",
  cooldown: 15,
  channel: "mackthevoid",
  execute: async ({ client, channel }) => {
    let game = args.length === 0 ? await getGame(channel) : args.join(" ");
    const deathCount = await getDeathCount(channel, game.toLowerCase());
    return client.say(
      channel,
      `/me MacK has died a total of ${deathCount} times for ${game} ${
        deathCount === 0 ? "PridePog" : "kellee1Cry"
      }`
    );
  },
};
