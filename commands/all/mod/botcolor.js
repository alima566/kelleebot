const { log } = require("@utils/utils");

module.exports = {
  name: "botcolor",
  category: "Moderation",
  description: "Changes the bot's color.",
  channel: "all",
  isModOnly: true,
  execute: async ({ client, channel, args }) => {
    const color = args[0];
    client
      .color(process.env.BOT_USERNAME, color)
      .then((data) => {
        return client.say(
          channel,
          `/me My color has been changed to ${color}.`
        );
      })
      .catch((e) => {
        log("ERROR", "./commands/all/mod/botcolor.js", e.message);
        return client.say(
          channel,
          `/me Color must be one of the following: Blue, BlueViolet, CadetBlue, Chocolate, Coral, DodgerBlue, Firebrick, GoldenRod, Green, HotPink, OrangeRed, Red, SeaGreen, SpringGreen, YellowGreen.`
        );
      });
  },
};
