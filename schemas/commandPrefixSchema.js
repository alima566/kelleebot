const mongoose = require("mongoose");
const commandPrefixSchema = mongoose.Schema({
  // Channel name
  _id: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  prefix: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

module.exports = mongoose.model(
  "channel-command-prefixes",
  commandPrefixSchema
);
