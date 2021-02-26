const linkSchema = require("@schemas/linkSchema");
const { log } = require("@utils/utils");
const linkCache = {};

const getLink = async (channelName) => {
  const cachedValue = linkCache[`${channelName}`];
  if (cachedValue) {
    console.log("FETCHING FROM CACHE");
    return cachedValue;
  }

  console.log("FETCHING FROM DB");
  try {
    const result = await linkSchema.findOne({
      _id: channelName,
    });
    if (!result) {
      return;
    }

    const { link } = result;
    linkCache[`${channelName}`] = { link };
    return result;
  } catch (e) {
    log("ERROR", "./utils/dbHelpers/links.js", e.message);
  }
};

const setLink = async (channelName, userstate, link) => {
  try {
    const result = await linkSchema.findByIdAndUpdate(
      {
        _id: channelName,
      },
      {
        $set: {
          updatedBy: userstate.username,
          link,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    linkCache[`${channelName}`] = {
      link: result.link,
    };
    return result;
  } catch (e) {
    log("ERROR", "./utils/dbHelpers/links.js", e.message);
  }
};

module.exports = {
  getLink,
  setLink,
};
