const { setDeathCounter } = require("@dbHelpers/deaths");
const { getGame } = require("@utils/functions");

module.exports = {
  name: "setdeath",
  aliases: ["sd"],
  category: "Moderation",
  description: "Sets the death counter.",
  channel: "mackthevoid",
  isModOnly: true,
  execute: async ({ client, channel, args }) => {
    const channelName = channel.slice(1);
    const game = await getGame(channelName);
    const deathCount = args[0].trim();
    if (isNaN(deathCount)) {
      return client.say(channel, `/me ${deathCount} is not a number!`);
    }

    const newDeathCount = await setDeathCounter(
      channel,
      game.toLowerCase(),
      parseInt(deathCount)
    );
    return client.say(
      channel,
      `/me The death counter for ${game} has been set to ${newDeathCount}.`
    );
  },
};
