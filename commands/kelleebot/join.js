const twitchChannelsSchema = require("@schemas/twitchChannelsSchema");
const { PREFIX } = require("@root/config.json");
const { log } = require("@utils/utils");

module.exports = {
  name: "join",
  category: "KelleeBot",
  description: "KelleeBot joins your channel",
  channel: ["kelleebot"],
  execute: async ({ client, channel, userstate }) => {
    try {
      await new twitchChannelsSchema({
        _id: userstate.username,
      }).save();

      client.say(
        channel,
        `/me I have now joined your channel! My default command prefix is "${PREFIX}", however, this can easily be changed by doing the command "!prefix <New Prefix>".`
      );

      process.exit();
    } catch (e) {
      log(
        "ERROR",
        "./commands/kelleebot/join.js",
        `An error has occurred: ${e.message}`
      );

      return client.say(
        channel,
        `/me I am already in your channel. No need for me to join it again.`
      );
    }
  },
};
