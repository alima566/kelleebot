const { set } = require("mongoose");

module.exports = {
  name: "command",
  category: "Dev Only",
  devOnly: true,
  execute: async ({ client, channel, args }) => {
    const channelName = channel.slice(1);
    let channelInfo = client.channelInfoCache.get(channelName);
    let disabledCommands = channelInfo.disabledCommands;

    if (args.length < 2) {
      return client.say(
        channel,
        `/me ${channelInfo.prefix}command <enable || disable> <command>`
      );
    }

    if (!args[1]) {
      return client.say(channel, `/me Please specify a command.`);
    }

    const command = client.commands.get(args[1].toLowerCase());
    if (!command) {
      return client.say(
        channel,
        `/me The command "${args[1]}" does not exist.`
      );
    }

    if (command.canNotDisable) {
      return client.say(
        channel,
        `/me The command "${command.name}" can't be enabled/disabled.`
      );
    }

    switch (args[0]) {
      case "disable":
        if (disabledCommands.includes(command.name)) {
          return client.say(
            channel,
            `/me The command "${command.name}" is already disabled.`
          );
        }

        await client.DBChannel.findByIdAndUpdate(
          {
            _id: channelName,
          },
          {
            $push: {
              disabledCommands: command.name,
            },
          },
          {
            upsert: true,
            new: true,
          }
        );

        channelInfo.disabledCommands.push(command.name);
        client.channelInfoCache.set(channelName, channelInfo);
        client.say(
          channel,
          `/me The command "${command.name}" has been disabled.`
        );
        break;
      case "enable":
        if (!disabledCommands.includes(command.name)) {
          return client.say(
            channel,
            `/me The command "${command.name}" is already enabled.`
          );
        }

        channelInfo = await client.DBChannel.findByIdAndUpdate(
          {
            _id: channelName,
          },
          {
            $pull: {
              disabledCommands: command.name,
            },
          },
          {
            upsert: true,
            new: true,
          }
        );
        client.channelInfoCache.set(channelName, channelInfo);
        client.say(
          channel,
          `/me The command "${command.name}" has been enabled.`
        );
        break;
    }
  },
};
