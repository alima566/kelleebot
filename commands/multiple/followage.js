const fetch = require("node-fetch");
const { replaceChars } = require("@utils/functions");
const { log } = require("@utils/utils");

module.exports = {
  name: "followage",
  category: "Multiple",
  description: "Tells you how long you have been following the streamer.",
  cooldown: 15,
  channel: ["jkirstyn", "ramenbomber_"],
  execute: ({ client, channel, userstate }) => {
    fetch(
      `https://beta.decapi.me/twitch/followage/${channel.slice(1)}/${
        userstate.username
      }?precision=7`
    )
      .then((response) => response.text())
      .then((data) => {
        if (replaceChars(data) === "a user cannot follow themself") {
          return client.say(channel, `/me ${data}`);
        }

        return client.say(
          channel,
          `/me ${userstate.username} has been following ${channel.slice(
            1
          )} for ${data}.`
        );
      })
      .catch((e) => {
        log("ERROR", "./commands/multiple/followage.js", e.message);
        return client.say(
          channel,
          `/me An error has occurred. Please try again.`
        );
      });
  },
};
