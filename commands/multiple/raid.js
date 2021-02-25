const raidMsg = {
  ramenbomber_: "ramenb2Pichu ramenb2Pichu Ramen Raid!",
  mackthevoid:
    "mackth2PillowTime mackth2PillowTime mackth2PillowTime AHHH IT'S A RAID!!! mackth2Fngrgun mackth2Fngrgun mackth2Fngrgun STICK 'EM UP!!!mackth2PillowTime mackth2PillowTime mackth2PillowTime AHHH IT'S A RAID!!! mackth2Fngrgun mackth2Fngrgun mackth2Fngrgun STICK 'EM UP!!!",
};

module.exports = {
  name: "raid",
  category: "Multiple",
  description: "Tells you the raid message.",
  cooldown: 15,
  channel: ["ramenbomber_", "mackthevoid"],
  execute: ({ client, channel }) => {
    const channelName = channel.slice(1).toLowerCase();
    const raid = raidMsg[channelName];
    return client.say(channel, `/me ${raid}`);
  },
};
