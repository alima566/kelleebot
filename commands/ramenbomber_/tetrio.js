const { getLink } = require("@utils/dbHelpers/links");
const { log } = require("@utils/utils");

module.exports = {
  name: "tetrio",
  aliases: ["room", "code"],
  category: "ramenbomber_",
  description: "Displays the Tetrio room code.",
  cooldown: 15,
  channel: "ramenbomber_",
  execute: async ({ client, channel }) => {
    try {
      const result = await getLink(channel.slice(1));
      if (!result) {
        return client.say(channel, `/me No tetrio room code has been set yet.`);
      }

      const { link } = result;
      return client.say(channel, `/me Tetrio room: ${link}`);
    } catch (e) {
      log("ERROR", "./commands/ramenbomber_/tetrio.js", e.message);
    }
  },
};
