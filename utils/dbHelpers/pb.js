const pbSchema = require("@schemas/pbSchema");
const { log } = require("@utils/utils");
const pbCache = {};

const getPB = async (channelName, currentGame) => {
  const cachedValue = pbCache[`${channelName}-${currentGame}`];
  if (cachedValue) {
    console.log("FETCHING FROM CACHE");
    return cachedValue;
  }

  console.log("FETCHING FROM DB");
  try {
    const result = await pbSchema.findOne({
      channelName,
      game: currentGame,
    });
    console.log(result);
    if (!result) {
      return;
    }

    const { pb, game, updatedAt } = result;
    pbCache[`${channelName}-${game}`] = { pb, game, updatedAt };
    return result;
  } catch (e) {
    log("ERROR", "./utils/dbHelpers/pb.js", e.message);
  }
};

const setPB = async (channelName, pb, game) => {
  try {
    const result = await pbSchema.findOneAndUpdate(
      {
        channelName,
        game,
      },
      {
        $set: {
          pb,
          game,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    pbCache[`${channelName}-${game}`] = {
      pb: result.pb,
      game: result.game,
    };
    return result;
  } catch (e) {
    log("ERROR", "./utils/dbHelpers/pb.js", e.message);
  }
};

module.exports = {
  getPB,
  setPB,
};
