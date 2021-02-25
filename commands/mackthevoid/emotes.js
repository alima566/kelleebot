module.exports = {
  name: "emotes",
  category: "mackthevoid",
  description: "Tells you who created Mack's emotes.",
  cooldown: 15,
  channel: "mackthevoid",
  execute: ({ client, channel }) => {
    return client.say(
      channel,
      `/me You like these emotes? mackth2Fngrgun mackth2PillowTime mackth2Love Those stellar sub badges? Look! It's bearyclairey at https://www.twitch.tv/bearyclairey!!! She is the amazing artist who made them so be sure to say thanks by showing your support!`
    );
  },
};
