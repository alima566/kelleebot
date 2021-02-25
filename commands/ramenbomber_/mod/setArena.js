const { setArenaIDAndPass } = require("@utils/arena");
const { log } = require("@utils/utils");

module.exports = {
  name: "setarena",
  category: "Moderation",
  description: "Sets the Arena ID and Password for Ramen's arena command.",
  channel: "ramenbomber_",
  isModOnly: true,
  execute: async ({ client, channel, args, userstate }) => {
    const channelName = channel.slice(1);
    const channelInfo = client.channelInfoCache.get(channelName);

    if (args.length < 2) {
      return client.say(
        channel,
        `/me Usage: ${channelInfo.prefix}setarena <ID> <Password>`
      );
    }

    const arenaID = args[0];
    const arenaPass = args[1];
    try {
      await setArenaIDAndPass(channelName, userstate, arenaID, arenaPass);
      return client.say(
        channel,
        `/me The Arena ID and Password have been updated.`
      );
    } catch (e) {
      log("ERROR", "./commands/ramenbomber_/mod/setArena.js", e.message);
      return client.say(
        channel,
        `/me An error occurred while setting the Arena ID and Password. Please try again.`
      );
    }
  },
};
