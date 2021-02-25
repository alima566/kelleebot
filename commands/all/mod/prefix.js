module.exports = {
  name: "prefix",
  aliases: ["setprefix"],
  category: "Moderation",
  description: "Retrieves or sets the channel's command prefix.",
  channel: "all",
  isModOnly: true,
  execute: async ({ client, channel, args }) => {
    const channelName = channel.slice(1);
    const channelInfo = client.channelInfoCache.get(channelName);

    if (!args[0]) {
      return client.say(
        channel,
        `/me The current prefix for this channel is "${channelInfo.prefix}".`
      );
    }

    if (args[0] === "/" || args[0] === ".") {
      return client.say(
        channel,
        `/me Cannot set command prefix to "${args[0]}" as this will conflict with Twitch commands.`
      );
    }

    if (channelInfo.prefix === args[0]) {
      return client.say(
        channel,
        `/me My prefix is already "${args[0]}". Please try a new one.`
      );
    }

    await client.DBChannel.findByIdAndUpdate(
      {
        _id: channelName,
      },
      {
        $set: {
          prefix: args[0],
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    channelInfo.prefix = args[0];
    client.channelInfoCache.set(channelName, channelInfo);
    return client.say(
      channel,
      `/me The prefix has now been set to "${args[0]}".`
    );
  },
};
