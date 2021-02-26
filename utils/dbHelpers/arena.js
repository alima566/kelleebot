const ramenArenaCommandSchema = require("@schemas/ramenArenaSchema");
const { log } = require("@utils/utils");
const arenaCache = {};

const getArenaIDAndPass = async (channelName) => {
  const cachedValue = arenaCache[`${channelName}`];
  if (cachedValue) {
    console.log("FETCHING FROM CACHE");
    return cachedValue;
  }

  console.log("FETCHING FROM DB");
  try {
    const result = await ramenArenaCommandSchema.findOne({
      channelName,
    });
    if (!result) {
      return;
    }

    const { arenaID, arenaPass } = result;
    arenaCache[`${channelName}`] = { arenaID, arenaPass };
    return result;
  } catch (e) {
    log("ERROR", "./utils/dbHelpers/arena.js", e.message);
  }
};

const setArenaIDAndPass = async (
  channelName,
  userstate,
  arenaID,
  arenaPass
) => {
  try {
    const result = await ramenArenaCommandSchema.findOneAndUpdate(
      {
        channelName,
      },
      {
        $set: {
          updatedBy: userstate.username,
          arenaID,
          arenaPass,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    arenaCache[`${channelName}`] = {
      arenaID: result.arenaID,
      arenaPass: result.arenaPass,
    };
    return result;
  } catch (e) {
    log("ERROR", "./utils/arena.js", e.message);
  }
};

module.exports = { getArenaIDAndPass, setArenaIDAndPass };
