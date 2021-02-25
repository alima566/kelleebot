const moment = require("moment-timezone");

module.exports = {
  name: "gamenight",
  category: "mackthevoid",
  cooldown: 15,
  channel: "mackthevoid",
  execute: ({ client, channel }) => {
    const timezone = moment.tz("America_Denver").format("z");
    return client.say(
      channel,
      `/me Game night every Saturday at 8 ${timezone}, featuring these lovely folks, give them a follow! J: https://www.twitch.tv/jkirstyn/ Krisy: https://www.twitch.tv/krisypaulinee/ Austin: https://www.twitch.tv/sanctionxv/ Claire: https://www.twitch.tv/bearyclairey`
    );
  },
};
