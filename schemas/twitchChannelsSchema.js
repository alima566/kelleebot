const mongoose = require("mongoose");
const { PREFIX } = require("@root/config.json");

const twitchChannelsSchema = mongoose.Schema({
  _id: String, //channel
  prefix: {
    default: PREFIX,
    type: String,
  },
  disabledCommands: Array,
  commands: Array,
  commandCooldowns: {},
  commandAlias: {},
});

module.exports = mongoose.model(
  "twitch-channels-schema",
  twitchChannelsSchema,
  "twitch-channels-schema"
);
