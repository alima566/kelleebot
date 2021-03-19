const {
  processArguments,
  log,
  getCooldown,
  msToTime,
} = require("@utils/utils");
const { isBroadcaster, getAllChannels } = require("@utils/functions");
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const { devs } = require("@root/config.json");

module.exports = async (client, channel, userstate, message, self) => {
  try {
    if (self) return;

    checkTwitchChat(userstate, message, channel);

    let channelInfo = client.channelInfoCache.get(channel.slice(1));
    if (!channelInfo) {
      channelInfo = await client.DBChannel.findByIdAndUpdate(
        channel.slice(1),
        {},
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      delete channelInfo._id;
      client.channelInfoCache.set(channel.slice(1), channelInfo);
    }

    if (
      channelInfo._id === "ramenbomber_" &&
      message.toLowerCase().includes("uwu")
    ) {
      return client.say(channel, `PrideUwu PrideUwu`);
    }

    const prefixRegex = new RegExp(`^(${escapeRegex(channelInfo.prefix)})\\s*`);
    if (!prefixRegex.test(message)) return;

    const [, matchedPrefix] = message.match(prefixRegex);
    let msgArgs = message.slice(matchedPrefix.length).trim().split(/ +/);
    let cmdName = msgArgs.shift().toLowerCase();

    const command =
      client.commands.get(cmdName) ||
      (channelInfo.commandAlias
        ? client.commands.get(channelInfo.commandAlias[cmdName])
        : false);

    if (!command) return;

    const broadcaster = await isBroadcaster(userstate.username, channel);

    console.log(userstate.mod);
    console.log(broadcaster);

    if (
      !userstate.mod &&
      !broadcaster &&
      userstate.username.toLowerCase() !== "iaraaron" &&
      command.isModOnly
    ) {
      return;
    }

    if (command.devOnly && !devs.includes(userstate.username.toLowerCase()))
      return;

    if (command.channel === "all" || typeof command.channel === "undefined") {
      command.channel = await getAllChannels();
    }

    if (typeof command.channel === "string") {
      command.channel = [command.channel];
    }

    if (!command.channel.includes(channel.slice(1))) return;

    if (channelInfo.disabledCommands.includes(command.name)) return;

    const cd = getCooldown(client, command, channel);

    let cooldowns;
    if (cd) {
      if (
        typeof command.globalCooldown === "undefined" ||
        command.globalCooldown
      ) {
        if (!client.globalCooldowns.has(command.name)) {
          client.globalCooldowns.set(command.name, new Map());
        }
        cooldowns = client.globalCooldowns;
      } else {
        if (!client.channelCooldowns.has(channel.slice(1))) {
          client.channelCooldowns.set(channel.slice(1), new Map());
        }
        cooldowns = client.channelCooldowns.get(channel.slice(1));
        if (!cooldowns.has(command.name)) {
          cooldowns.set(command.name, new Map());
        }
      }

      const now = Date.now();
      const timestamps = cooldowns.get(command.name);
      const cooldownAmount = cd * 1000;
      if (timestamps.has(`${userstate["user-id"]}-${channel.slice(1)}`)) {
        //if (timestamps.has(userstate["user-id"])) {
        const expirationTime =
          timestamps.get(`${userstate["user-id"]}-${channel.slice(1)}`) +
          cooldownAmount;
        if (now < expirationTime)
          return console.log(
            `Command on cooldown. Cooldown expires in ${msToTime(
              expirationTime - now
            )}`
          );
      }

      timestamps.set(`${userstate["user-id"]}-${channel.slice(1)}`, now);
      setTimeout(
        () => timestamps.delete(`${userstate["user-id"]}-${channel.slice(1)}`),
        cooldownAmount
      );
    }

    let flags;
    if (command.args) {
      flags = processArguments(message, msgArgs, command.args);
    }
    if (flags && flags.invalid) {
      if (flags.prompt) {
        return client.say(channel, `/me ${flags.prompt}`);
      }
      return;
    }

    command.execute({
      client: client,
      channel: channel,
      userstate: userstate,
      message: message,
      args: msgArgs,
      text: msgArgs.join(" "),
      flags: flags,
    });
  } catch (e) {
    log("ERROR", "./events/message.js", e.message);
  }
};

const checkTwitchChat = (userstate, message, channel) => {
  if (userstate.mod || isBroadcaster(userstate.username, channel)) return;

  if (message.length > 250) {
    client
      .timeout(channel, userstate.username, 1, "Long message")
      .then((data) => {
        client.say(
          channel,
          `/me ${userstate.username}, the mods here don't like reading long messages. Please try to keep it short and sweet.`
        );
      })
      .catch((e) => {
        log("ERROR", "./events/message.js", e.message);
      });
  }

  if (
    message.includes("bigfollows .com") ||
    message.includes("bigfollows.com") ||
    message.includes(
      "Wanna b̔ecome̤ famoͅus̈́?̿ Bu͗y f̭ollow̮ers, primes and viewers on ̫" //https://clck.ru/R9gQV ͉(bigfollows .com)̰"
    )
  ) {
    client
      .ban(channel, userstate.username)
      .then((data) => {
        client.say(channel, `/me No, I don't wanna become famous. Good bye!`);
      })
      .catch((e) => {
        log("ERROR", "./events/message.js", e.message);
      });
  } else if (
    message ===
    "Hey. I want to offer you a boost on twitch, a stable number of viewers, there are chat bots. I will offer a price lower than any competitor. Auto-start when stream became online.Pay only for the time when the stream is online.Pay by the hour! I'll provide a free test.The client has access to the panel to launch, and can control the process himself!For tech problems, a full refund. Telegram @Twitch_viewers Discord Twitch#3227"
  ) {
    client
      .ban(channel, userstate.username)
      .then((data) => {
        client.say(
          channel,
          `/me No, I don't want a boost on Twitch. Get outta here!`
        );
      })
      .catch((e) => {
        log("ERROR", "./events/message.js", e.message);
      });
  }
};
