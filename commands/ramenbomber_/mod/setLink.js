const { setLink } = require("@utils/dbHelpers/links");
const { log } = require("@utils/utils");

module.exports = {
  name: "setlink",
  alias: ["settet", "setroom"],
  category: "Moderation",
  description: "Sets the tetrio room lobby link.",
  channel: "ramenbomber_",
  isModOnly: true,
  execute: async ({ client, channel, args, userstate }) => {
    const channelName = channel.slice(1);
    const channelInfo = client.channelInfoCache.get(channelName);

    if (args.length === 0) {
      return client.say(
        channel,
        `/me Usage: ${channelInfo.prefix}setlink <link>`
      );
    }

    const link = args[0];
    try {
      await setLink(channelName, userstate, link);
      return client.say(channel, `/me The tetrio room code has been updated.`);
    } catch (e) {
      log("ERROR", "./commands/ramenbomber_/mod/setLink.js", e.message);
      return client.say(
        channel,
        `/me An error occurred while trying to set the tetrio room code. Please try again.`
      );
    }
  },
};
