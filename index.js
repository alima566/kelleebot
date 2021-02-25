require("module-alias/register");
require("dotenv").config();

const tmi = require("tmi.js");
const mongoose = require("mongoose");

const { registerEvents, registerCommands } = require("@utils/registry");
const { log } = require("@utils/utils");
const twitchChannelsSchema = require("@schemas/twitchChannelsSchema");

(async () => {
  const channels = [];

  try {
    await mongoose.connect(process.env.MONGO_PATH, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    log("SUCCESS", "./main.js", "Connected to database.");
  } catch (e) {
    log(
      "ERROR",
      "./main.js",
      `Error connecting to the database: ${e.message}.`
    );
    process.exit(1);
  }

  try {
    const results = await twitchChannelsSchema.find({});
    for (const result of results) {
      channels.push(result._id);
    }

    const opts = {
      options: {
        debug: true,
      },
      connection: {
        reconnect: true,
        secure: true,
        timeout: 180000,
        reconnectDecay: 1.4,
        reconnectInterval: 1000,
      },
      identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN,
      },
      channels: channels,
    };

    const client = new tmi.client(opts);
    await client.connect();

    client.commands = new Map();
    client.categories = new Map();
    client.channelInfoCache = new Map();

    client.DBChannel = twitchChannelsSchema;
    client.channelCooldowns = new Map();
    client.globalCooldowns = new Map();

    await registerEvents(client, "../events");
    await registerCommands(client, "../commands");
  } catch (e) {
    log("ERROR", "./main.js", `There was an error: ${e.message}`);
  }

  log(
    "SUCCESS",
    "./main.js",
    "Successfully loaded all commands, categories, events, schemas, and connected to MongoDB."
  );
})();
