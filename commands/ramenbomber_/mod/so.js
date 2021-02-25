const fetch = require("node-fetch");

module.exports = {
  name: "so",
  aliases: ["shoutout"],
  category: "Moderation",
  description: "Shouts a fellow streamer out.",
  channel: "ramenbomber_",
  cooldown: 15,
  globalCooldown: true,
  isModOnly: true,
  execute: async ({ client, channel, args }) => {
    let userToSo = args[0].startsWith("@")
      ? args[0].replace("@", "").toLowerCase()
      : args[0].toLowerCase();

    fetch(`https://beta.decapi.me/twitch/game/${encodeURIComponent(userToSo)}`)
      .then((resp) => resp.json())
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

        return client.say(
          channel,
          `/me Mmmmm... do you like Ramen? 🍜🍜🍜 If you do, then you should also check out ${userToSo} at https://www.twitch.tv/${userToSo}! They were last seen playing ${data}. PrideFloat PrideFloat`
        );
      });
  },
};
