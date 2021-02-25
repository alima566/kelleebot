// const ramenCommands = require("@root/ramen-commands");
// const mackCommands = require("@root/mack-commands");

module.exports = (client, channel, username, viewers) => {
  if (
    channel.slice(1) === "mackthevoid" ||
    channel.slice(1) === "ramenbomber_"
  ) {
    client.say(
      channel,
      `/me Incoming raid! Thank you @${username} for raiding the channel with ${viewers} viewer${
        viewers !== 1 ? "s" : ""
      }! Welcome raiders!`
    );
    shoutouts(client, channel, username, viewers);
  }
};

const shoutouts = (client, channel, username, viewers) => {
  if (channel.slice(1).toLowerCase() === "mackthevoid") {
    //mackCommands.shoutout(client, channel, null, username);
  } else if (channel.slice(1).toLowerCase() === "ramenbomber_") {
    //ramenCommands.shoutout(client, channel, null, username);
  }
};
