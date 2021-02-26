const { incrementDeathCounter } = require("@dbHelpers/deaths");
const { getGame } = require("@utils/functions");

module.exports = {
  name: "deathadd",
  aliases: ["da", "d+"],
  category: "Moderation",
  description: "Adds to the death counter.",
  channel: "mackthevoid",
  isModOnly: true,
  execute: async ({ client, channel }) => {
    const game = await getGame(channel);
    const newDeathCount = await incrementDeathCounter(
      channel,
      game.toLowerCase()
    );
    return client.say(
      channel,
      `/me The death counter for ${game} has been updated to ${
        newDeathCount === 0 ? 1 : newDeathCount
      }.`
    );
  },
};
