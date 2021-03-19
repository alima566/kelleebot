const twitchChannelsSchema = require("@schemas/twitchChannelsSchema");
const { log } = require("@utils/utils");
const fetch = require("node-fetch");

const isBroadcaster = async (user, channel) => {
  const result = await twitchChannelsSchema.findOne({
    _id: user.toLowerCase(),
  });

  if (!result) return false;
  return (
    user.toLowerCase() === result._id.toLowerCase() &&
    user.toLowerCase() === channel.slice(1).toLowerCase()
  );
};

const getAllChannels = async () => {
  const channels = [];
  const results = await twitchChannelsSchema.find({});
  for (const result of results) {
    channels.push(result._id);
  }
  return channels;
};

const getRandomElement = (array) => {
  return Math.floor(Math.random() * array.length);
};

const replaceChars = (str) => {
  return str
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_'""`~()]/g, "")
    .replace(/\s{2,}/g, " ");
};

const getGame = (channel) => {
  return new Promise(async (resolve, reject) => {
    try {
      const body = await fetch(`https://beta.decapi.me/twitch/game/${channel}`);
      const result = await body.text();
      if (result) {
        !resolve(result);
      } else {
        reject("There was a problem retrieving game data.");
      }
    } catch (e) {
      log("ERROR", "./utils/functions.js", e.message);
    }
  });
};

module.exports = {
  isBroadcaster,
  getAllChannels,
  getRandomElement,
  replaceChars,
  getGame,
};
