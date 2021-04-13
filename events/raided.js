const { getGame } = require("@utils/functions");
const { shoutouts } = require("@utils/shoutouts");
const autoShoutoutChannels = ["mackthevoid", "ramenbomber_", "jkirstyn"];

module.exports = async (client, channel, username, viewers) => {
  const channelName = channel.slice(1).toLowerCase();

  if (autoShoutoutChannels.includes(channelName)) {
    client.say(
      channel,
      `/me Incoming raid! Thank you @${username} for raiding the channel with ${viewers} viewer${
        viewers !== 1 ? "s" : ""
      }! Welcome raiders!`
    );

    const game = await getGame(username);
    let shoutout = shoutouts[channelName];
    shoutout = shoutout
      .replace(/<userToSo>/g, username)
      .replace(/<game>/g, game);

    client.say(channel, `/me ${shoutout}`);
  }
};
