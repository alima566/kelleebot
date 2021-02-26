const { getArenaIDAndPass } = require("@dbHelpers/arena");
const { log } = require("@utils/utils");

module.exports = {
  name: "arena",
  category: "ramenbomber_",
  description: "Displays the Arena ID and Password for Smash.",
  cooldown: 15,
  channel: "ramenbomber_",
  execute: async ({ client, channel }) => {
    try {
      const result = await getArenaIDAndPass(channel.slice(1));
      if (!result) {
        return client.say(
          channel,
          `/me No Arena ID and Password have been set yet.`
        );
      }

      const { arenaID, arenaPass } = result;
      return client.say(channel, `/me ID: ${arenaID} PW: ${arenaPass}`);
    } catch (e) {
      log("ERROR", "./commands/ramenbomber_/arena.js", e.message);
    }
  },
};
