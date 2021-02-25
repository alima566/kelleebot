const moment = require("moment-timezone");

module.exports = {
  name: "time",
  category: "mackthevoid",
  description: "Shows Mack's current time.",
  cooldown: 15,
  channel: "mackthevoid",
  execute: ({ client, channel }) => {
    const time = moment.tz("America_Denver").format("DD/MM/YYYY h:mm:ss A z");
    return client.say(channel, `/me MacK's current time is ${time}.`);
  },
};
