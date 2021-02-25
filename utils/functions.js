const twitchChannelsSchema = require("@schemas/twitchChannelsSchema");

const isBroadcaster = async (user) => {
  const result = await twitchChannelsSchema.findOne({
    _id: user.toLowerCase(),
  });

  if (!result) return false;
  return user.toLowerCase() === result._id.toLowerCase();
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

module.exports = {
  isBroadcaster,
  getAllChannels,
  getRandomElement,
  replaceChars,
};
