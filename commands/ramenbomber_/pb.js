const { getPB } = require("@dbHelpers/pb.js");
const { log } = require("@utils/utils");
const { getGame } = require("@utils/functions");
const { utcToZonedTime, format } = require("date-fns-tz");

module.exports = {
  name: "pb",
  category: "ramenbomber_",
  description: "Displays the PB for the current game.",
  cooldown: 15,
  channel: "ramenbomber_",
  execute: async ({ client, channel }) => {
    const channelName = channel.slice(1).toLowerCase();
    const currentGame = await getGame(channelName);

    try {
      const result = await getPB(channelName, currentGame);
      if (!result) {
        return client.say(
          channel,
          `/me No PB for "${currentGame}" has been set yet.`
        );
      }

      const { pb, game, updatedAt } = result;
      const timeFormat = "EEE, MMM d, yyyy h:mm a zzz";
      const updatedAtEasternDate = utcToZonedTime(
        updatedAt,
        "America/New_York"
      );
      const text = `Your PB for ${game} is ${pb} which was achieved on ${format(
        updatedAtEasternDate,
        timeFormat,
        {
          timeZone: "America/New_York",
        }
      )}`;

      return client.say(channel, `/me ${text}`);
    } catch (e) {
      log("ERROR", "./commands/ramenbomber_/pb.js", e.message);
    }
  },
};
