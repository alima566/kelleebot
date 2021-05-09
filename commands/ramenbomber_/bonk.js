const { getRandomElement } = require("@utils/functions");

const bonks = [
  "a shovel.",
  "a hammer.",
  "a bat.",
  "a pole.",
  "a trash can filled with empty Coca-Cola bottles Kappa",
  "a trash can.",
  "love kellee1Love",
];

module.exports = {
  name: "bonk",
  category: "ramenbomber_",
  description: "Bonks a viewer in chat.",
  cooldown: 15,
  globalCooldown: true,
  channel: "ramenbomber_",
  execute: ({ client, channel, userstate, args }) => {
    if (args.length === 0) {
      return client.say(channel, `/me I don't know who to bonk.`);
    }

    let userToBonk = args[0].startsWith("@")
      ? args[0].replace("@", "").trim()
      : args[0].trim();

    if (userToBonk.toLowerCase() === process.env.BOT_USERNAME.toLowerCase()) {
      return client.say(
        channel,
        `/me Nuh uh uh, nice try, but you can't bonk me cause I'll bonk you instead BOP BOP BOP`
      );
    }

    if (userToBonk.toLowerCase() === "kelleeluna") {
      return client.say(
        channel,
        `/me ${userstate["display-name"]} bonks Kellee with love kellee1Love`
      );
    }

    const index = getRandomElement(bonks);
    const bonk = bonks[index];

    return client.say(
      channel,
      `/me ${userstate["display-name"]} bonks ${userToBonk} with ${bonk}`
    );
  },
};
