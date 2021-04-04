const { setPB } = require("@dbHelpers/pb");
const { log } = require("@utils/utils");
const { getGame } = require("@utils/functions");

module.exports = {
  name: "setpb",
  category: "Moderation",
  description: "Sets the PB for the current game.",
  channel: "ramenbomber_",
  isModOnly: true,
  execute: async ({ client, channel, text, userstate }) => {
    const channelName = channel.slice(1);
    const channelInfo = client.channelInfoCache.get(channelName);
    const game = await getGame(channelName);

    if (text.length === 0) {
      return client.say(
        channel,
        `/me Usage: ${channelInfo.prefix}setpb <PB Time>`
      );
    }

    try {
      await setPB(channelName, text, game);
      return client.say(channel, `/me Your PB has been updated.`);
    } catch (e) {
      log("ERROR", "./commands/ramenbomber_/mod/setPB.js", e.message);
      return client.say(
        channel,
        `/me An error occurred while trying to set the PB. Please try again.`
      );
    }
  },
};
