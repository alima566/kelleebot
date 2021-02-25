const { log } = require("@utils/utils");
const { PREFIX } = require("@root/config.json");
const commandPrefixSchema = require("@schemas/commandPrefixSchema");
const channelPrefix = {};

const getChannelPrefix = () => {
  return channelPrefix;
};

const updateCache = (channelName, newPrefix) => {
  channelPrefix[channelName] = newPrefix;
};

const loadPrefixes = async (channels) => {
  try {
    for (const channel of channels) {
      const channelName = channel.slice(1).toLowerCase();
      const result = await commandPrefixSchema.findOne({ _id: channelName });
      channelPrefix[channelName] = result ? result.prefix : PREFIX;
    }
    console.log(channelPrefix);
  } catch (e) {
    log("ERROR", "./utils/channelPrefix.js", `An error occured: ${e.message}`);
  }
};

module.exports = {
  getChannelPrefix,
  updateCache,
  loadPrefixes,
};
