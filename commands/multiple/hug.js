const hugMsg = {
  ramenbomber_: "<from> gives <to> a big hug! PrideRise",
  mackthevoid:
    "<from> hugs <to> from 6 feet away! I love you (⊃｡•́‿•̀｡)⊃ you are doing great.",
  b0ss_99: "<from> gives <to> a big hug! PrideRise",
};

module.exports = {
  name: "hug",
  category: "Multiple",
  description: "Gives another viewer in chat a hug.",
  cooldown: 15,
  channel: ["ramenbomber_", "mackthevoid", "b0ss_99"],
  execute: ({ client, userstate, channel, args }) => {
    if (args.length === 0) {
      return client.say(channel, `/me I don't know who to hug BibleThump`);
    }

    const channelName = channel.slice(1).toLowerCase();
    let hug = hugMsg[channelName];
    let userToHug = args[0].startsWith("@")
      ? args[0].replace("@", "").trim()
      : args[0].trim();

    hug = hug
      .replace(/<from>/g, userstate.username)
      .replace(/<to>/g, userToHug);
    return client.say(channel, `/me ${hug}`);
  },
};
