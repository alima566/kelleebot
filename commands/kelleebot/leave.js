const twitchChannelsSchema = require("@schemas/twitchChannelsSchema");
const { log } = require("@utils/utils");

module.exports = {
  name: "leave",
  category: "KelleeBot",
  description: "KelleeBot joins your channel",
  channel: ["kelleebot"],
  execute: async ({ client, channel, userstate }) => {
    const result = await twitchChannelsSchema.findOneAndDelete({
      _id: userstate.username,
    });
    if (!result) {
      return client.say(
        channel,
        `/me Hmmm... it seems like I haven't joined your channel yet, so I can't leave.`
      );
    }

    client.say(channel, `/me I have now left your channel.`);
    process.exit();
  },
};
