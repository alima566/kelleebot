const fetch = require("node-fetch");
const { log } = require("@utils/utils");

module.exports = {
  name: "villager",
  category: "Animal Crossing",
  description: "Retrieves information about the specified AC villager.",
  cooldown: 15,
  channel: ["krisypaulinee", "jkirstyn"],
  args: [
    {
      type: "SOMETHING",
      prompt: "Please provide a villager name to find.",
      min: 1,
      id: "villager",
    },
  ],
  execute: async ({ client, channel, text }) => {
    const channelName = channel.slice(1);
    const channelInfo = client.channelInfoCache.get(channelName);

    if (text.length === 0) {
      return client.say(
        channel,
        `/me Usage: ${channelInfo.prefix}villager <villager name>`
      );
    }

    if (text.includes(" ")) {
      text = text.replace(/ +/g, "_");
    }

    fetch(
      `https://api.nookipedia.com/villagers?name=${encodeURIComponent(
        text.toLowerCase()
      )}&nhdetails=true`,
      {
        method: "GET",
        headers: {
          "X-API-KEY": process.env.NOOK_API_KEY,
          "Accept-Version": "2.0.0",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        client.say(
          channel,
          `/me ${
            data[0].name
          } is a ${data[0].personality.toLowerCase()} ${data[0].species.toLowerCase()}, ${
            data[0].phrase
          }! More info: ${data[0].url}`
        );
      })
      .catch((e) => {
        log("ERROR", "./commands/multiple/villager.js", e.message);
        return client.say(
          channel,
          `/me I couldn't find that villager kellee1Cry`
        );
      });
  },
};
