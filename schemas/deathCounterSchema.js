const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};
const deathCounterSchema = mongoose.Schema({
  channelName: reqString,
  game: reqString,
  deathCount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("death-counters", deathCounterSchema);
