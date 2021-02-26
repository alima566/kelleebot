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
    client
      .part(userstate.username)
      .then((data) => {
        return client.say(channel, `/me I have now left your channel.`);
      })
      .catch((e) => {
        log("ERROR", "./commands/kelleebot/leave.js", e.message);
        return client.say(channel, `/me An error occurred. Please try again.`);
      });
  },
};
