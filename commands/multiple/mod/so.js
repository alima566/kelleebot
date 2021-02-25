const fetch = require("node-fetch");

const shoutouts = {
  ramenbomber_:
    "Mmmmm... do you like Ramen? 🍜🍜🍜 If you do, then you should also check out <userToSo> at https://www.twitch.tv/<userToSo>! They were last seen playing <game>. PrideFloat PrideFloat",
  "7squish":
    "Show some love and support for <userToSo> PrideRise PrideRise PrideRise They last played <game> at https://www.twitch.tv/<userToSo>",
  mackthevoid:
    "mackth2Fngrgun Look! It's <userToSo> at https://www.twitch.tv/<userToSo> !!! You should follow them and watch them play <game>. Give them some love for me~~~ mackth2Fngrgun",
  bearyclairey:
    "I would be beary thankful if you would check out <userToSo> at https://www.twitch.tv/<userToSo>! They were last playing <game>. TBAngel TBAngel",
};

module.exports = {
  name: "so",
  aliases: ["shoutout"],
  category: "Moderation",
  description: "Shouts a fellow streamer out.",
  channel: ["ramenbomber_", "7squish", "mackthevoid", "bearyclairey"],
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

        let shoutout = shoutouts[channel.slice(1).toLowerCase()];
        shoutout = shoutout
          .replace(/<userToSo>/g, userToSo)
          .replace(/<game>/g, data);

        return client.say(channel, `/me ${shoutout}`);
      });
  },
};
