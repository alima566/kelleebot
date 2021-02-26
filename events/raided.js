const { shoutouts } = require("@utils/shoutouts");

module.exports = (client, channel, username, viewers) => {
  const channelName = channel.slice(1).toLowerCase();
  if (channelName === "mackthevoid" || channelName === "ramenbomber_") {
    client.say(
      channel,
      `/me Incoming raid! Thank you @${username} for raiding the channel with ${viewers} viewer${
        viewers !== 1 ? "s" : ""
      }! Welcome raiders!`
    );

    client.say(channel, `/me ${shoutouts[channelName]}`);
  }
};
