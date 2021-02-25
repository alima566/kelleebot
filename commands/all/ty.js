const { getRandomElement } = require("@utils/functions");
const { COMPLIMENTS } = require("@utils/compliments");

module.exports = {
  name: "ty",
  description: "Thanks/compliments a viewer in chat.",
  cooldown: 15,
  execute: async ({ client, channel, args, userstate }) => {
    const index = getRandomElement(COMPLIMENTS);
    if (args.length === 0) {
      return client.say(
        channel,
        `/me ${COMPLIMENTS[index].replace(
          "<user>",
          userstate.username
        )} KPOPheart`
      );
    }

    let user = args[0].startsWith("@") ? args[0].replace("@", "") : args[0];
    if (user.toLowerCase() === process.env.BOT_USERNAME.toLowerCase()) {
      return client.say(
        channel,
        `/me You better thank me. It's a lot of work being a bot on here.`
      );
    }

    return client.say(
      channel,
      `/me ${COMPLIMENTS[index].replace("<user>", user)} KPOPheart`
    );
  },
};
