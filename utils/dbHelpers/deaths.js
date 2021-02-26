const deathCounterSchema = require("@schemas/deathCounterSchema");
const { log } = require("@utils/utils");
const { client } = require("tmi.js");
const deathCountCache = {};

module.exports.incrementDeathCounter = async (channel, game) => {
  const channelName = channel.slice(1);
  try {
    const result = await deathCounterSchema.findOneAndUpdate(
      {
        channelName,
        game,
      },
      {
        channelName,
        game,
        $inc: {
          deathCount: 1,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    deathCountCache[`${channelName}-${game}`] = result.deathCount;
    return result.deathCount;
  } catch (e) {
    log("ERROR", "./utils/dbHelpers/deaths.js", e.message);
    return client.say(channel, `/me An error occurred. Please try again.`);
  }
};

module.exports.setDeathCounter = async (channel, game, deathCount) => {
  const channelName = channel.slice(1);
  try {
    const result = await deathCounterSchema.findOneAndUpdate(
      {
        channelName,
        game,
      },
      {
        channelName,
        game,
        $set: {
          deathCount,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );
    deathCountCache[`${channelName}-${game}`] = result.deathCount;
    return result.deathCount;
  } catch (e) {
    log("ERROR", "./utils/dbHelpers/deaths.js", e.message);
    return client.say(channel, `/me An error occurred. Please try again.`);
  }
};

module.exports.getDeathCount = async (channel, game) => {
  const channelName = channel.slice(1);
  const cachedValue = deathCountCache[`${channelName}-${game}`];
  if (cachedValue) {
    return cachedValue;
  }

  try {
    const result = await deathCounterSchema.findOne({
      channelName,
      game,
    });

    let deathCounter = 0;
    if (result) {
      deathCounter = result.deathCount;
    } else {
      await new deathCounterSchema({
        channelName,
        game,
        deathCount: deathCounter,
      });
    }
    deathCountCache[`${channelName}-${game}`] = deathCounter;
    return deathCounter;
  } catch (e) {
    log("ERROR", "./utils/dbHelpers/deaths.js", e.message);
    return client.say(channel, `/me An error occurred. Please try again.`);
  }
};
