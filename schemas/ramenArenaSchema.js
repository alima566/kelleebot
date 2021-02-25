const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};
const ramenArenaCommandSchema = mongoose.Schema(
  {
    channelName: reqString,
    updatedBy: reqString,
    arenaID: reqString,
    arenaPass: reqString,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ramen-arena-command",
  ramenArenaCommandSchema,
  "ramen-arena-command"
);
