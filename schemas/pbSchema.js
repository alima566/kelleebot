const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

const pbSchema = mongoose.Schema(
  {
    channelName: reqString,
    game: reqString,
    pb: reqString,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("pb", pbSchema);
