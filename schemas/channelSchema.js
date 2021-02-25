const { Schema, model } = require("mongoose");
const { PREFIX } = require("@root/config.json");

const channelSchema = Schema({
  _id: String,
  prefix: {
    default: PREFIX,
    type: String,
  },
  disabledCommands: Array,
  commandPerms: {},
  commandCooldowns: {},
  commandAlias: {},
});

module.exports = model("channel-schema", channelSchema);
