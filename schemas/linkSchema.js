const mongoose = require("mongoose");
const reqString = {
  type: String,
  required: true,
};

const linkSchema = mongoose.Schema(
  {
    channelName: reqString,
    updatedBy: reqString,
    link: reqString,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("link", linkSchema);
