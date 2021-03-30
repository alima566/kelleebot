const fetch = require("node-fetch");
const { replaceChars } = require("@utils/functions");
const { log } = require("@utils/utils");

module.exports = {
  name: "followedon",
  category: "Multiple",
  description: "Tells you when you started following the streamer.",
  cooldown: 15,
  channel: ["jkirstyn", "ramenbomber_", "mackthevoid"],
  execute: ({ client, channel, userstate }) => {
    fetch(
      `https://beta.decapi.me/twitch/followed/${channel.slice(1)}/${
        userstate.username
      }?tz=America/New_York&format=${encodeURIComponent("d/m/Y g:i:s A T")}`
    )
      .then((response) => response.text())
      .then((data) => {
        if (replaceChars(data) === "a user cannot follow themself") {
          return client.say(channel, `/me ${data}`);
        }

        return client.say(
          channel,
          `/me ${userstate["display-name"]} followed ${channel.slice(
            1
          )} on ${data}.`
        );
      })
      .catch((e) => {
        log("ERROR", "./commands/multiple/followedon.js", e.message);
        return client.say(
          channel,
          `/me An error has occurred. Please try again.`
        );
      });
  },
};
