const fetch = require("node-fetch");

module.exports = {
  name: "so",
  aliases: ["shoutout"],
  category: "Moderation",
  description: "Shouts a fellow streamer out.",
  cooldown: 15,
  channel: ["ramenbomber_", "7squish"],
  globalCooldown: true,
  isModOnly: true,
  execute: async ({ client, channel, args }) => {
    let userToSo = args[0].startsWith("@")
      ? args[0].replace("@", "").toLowerCase()
      : args[0].toLowerCase();

    fetch(`https://beta.decapi.me/twitch/game/${encodeURIComponent(userToSo)}`)
      .then((resp) => resp.text())
      .then((data) => {
        if (userToSo === process.env.BOT_USERNAME.toLowerCase()) {
          return client.say(
            channel,
            `/me Don't shout me out please. I don't like the attention.`
          );
        }

        if (typeof data === "undefined" || !data) {
          return client.say(
            channel,
            `/me ${userToSo} doesn't stream :( but you should go give them a follow anyways! https://www.twitch.tv/${userToSo}`
          );
        }

        if (
          data.toLowerCase().includes("no user") ||
          data.toLowerCase() === "404 page not found"
        ) {
          return client.say(
            channel,
            `/me I couldn't find that user kellee1Cry`
          );
        }

        let shoutout;
        if (channel.slice(1).toLowerCase() === "ramenbomber_") {
          shoutout = `Mmmmm... do you like Ramen? 🍜🍜🍜 If you do, then you should also check out ${userToSo} at https://www.twitch.tv/${userToSo}! They were last seen playing ${data}. PrideFloat PrideFloat`;
        } else if (channel.slice(1).toLowerCase() === "7squish") {
          shoutout = `Show some love and support for ${userToSo} PrideRise PrideRise PrideRise They last played ${data} at https://www.twitch.tv/${userToSo}`;
        }
        return client.say(channel, `/me ${shoutout}`);
      });
  },
};
