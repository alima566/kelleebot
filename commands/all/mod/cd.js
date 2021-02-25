const { countdown, countdownTeams, cd } = require("@utils/countdown");

module.exports = {
  name: "cd",
  aliases: ["countdown"],
  category: "Moderation",
  description: "Starts a countdown in chat.",
  channel: "all",
  isModOnly: true,
  execute: async ({ client, channel, args }) => {
    if (!(await isModOrVIP(client, channel))) {
      return client.say(
        channel,
        `/me In order for me to do a countdown properly, I must be made either a VIP or Mod of this channel.`
      );
    }

    if (cd.cdStarted) {
      return client.say(
        channel,
        `/me I can only do one countdown at a time kellee1Glare`
      );
    }

    if (!args.length) {
      cd.cdStarted = true;
      return countdown(client, channel, 6);
    }

    let duration = args[0];
    if (duration.length == 2) {
      if (isNaN(duration)) return;

      duration = parseInt(duration);
      if (duration == 20 || duration == 10) {
        cd.cdStarted = true;
        return countdown(client, channel, duration);
      }
    }

    if (duration.length == 3) {
      const color = duration.slice(2).toLowerCase();
      duration = duration.substr(0, 2);

      if (isNaN(duration)) return;

      if (color === "r" || color === "y" || color === "b" || color === "g") {
        cd.cdStarted = true;

        countdownTeams(client, channel, duration, color);
      } else {
        return client.say(channel, `/me Unknown color.`);
      }
    }
  },
};

const isModOrVIP = async (client, channel) => {
  const channelName = channel.slice(1).toLowerCase();

  const vips = await client.vips(channelName);
  const mods = await client.mods(channelName);

  return (
    vips.includes(process.env.BOT_USERNAME.toLowerCase()) ||
    mods.includes(process.env.BOT_USERNAME.toLowerCase())
  );
};
