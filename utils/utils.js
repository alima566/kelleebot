const { get } = require("mongoose");
const ms = require("ms");

const consoleColors = {
  SUCCESS: "\u001b[32m",
  WARNING: "\u001b[33m",
  ERROR: "\u001b[31m",
};

const hasAmount = ["SOMETHING", "NUMBER"];

const processArguments = (msg, msgArgs, expectedArgs) => {
  let counter = 0;
  let amount, num, time;
  let flags = {};

  for (const arg of expectedArgs) {
    if (hasAmount.includes(arg.type)) {
      amount = arg.amount && arg.amount > 1 ? arg.amount : 1;
    } else {
      amount = 1;
    }

    for (let i = 0; i < amount; i++) {
      switch (arg.type) {
        case "SOMETHING":
          if (!msgArgs[counter]) return { invalid: true, prompt: arg.prompt };

          if (arg.words && !arg.words.includes(msgArgs[counter].toLowerCase()))
            return { invalid: true, prompt: msgArgs.prompt };

          if (amount == 1) {
            flags[arg.id] = msgArgs[counter];
          } else if (flags[arg.id]) {
            flags[arg.id].push(msgArgs[counter]);
          } else {
            flags[arg.id] = [msgArgs[counter]];
          }
          break;

        case "NUMBER":
          num = Number(msgArgs[counter]);
          if (!msgArgs[counter] || isNaN(num))
            return { invalid: true, prompt: arg.prompt };

          if (arg.min && arg.min > num)
            return { invalid: true, prompt: arg.prompt };

          if (arg.max && arg.max < num)
            return { invalid: true, prompt: arg.prompt };

          if (arg.toInteger) num = parseInt(num);

          if (amount == 1) {
            flags[arg.id] = num;
          } else if (flags[arg.id]) {
            flags[arg.id].push(num);
          } else {
            flags[arg.id] = num;
          }
          break;

        case "TIME":
          if (!msgArgs[counter]) return { invalid: true, prompt: arg.prompt };

          time = msgArgs
            .slice(counter)
            .join("")
            .match(/(\d*)(\D*)/g);
          time.pop();

          num = 0;
          for (let i = 0; i < time.length; i++) {
            try {
              num += ms(time[i]);
            } catch (e) {
              return { invalid: true, prompt: arg.prompt };
            }
          }

          if (arg.min && num < arg.min)
            return { invalid: true, prompt: arg.prompt };

          if (arg.max && num > arg.max)
            return { invalid: true, prompt: arg.prompt };

          flags[arg.id] = num;
          break;

        default:
          log(
            "WARNING",
            "./utils/utils.js",
            `processArguments: The argument type "${arg.type}" does not exist.`
          );
      }
      counter++;
    }
  }
  return flags;
};

const getCooldown = (client, command, channel) => {
  let channelInfo = client.channelInfoCache.get(channel.slice(1));
  let cd = command.cooldown;
  if (
    channelInfo.commandCooldowns &&
    channelInfo.commandCooldowns[command.name]
  ) {
    cd = channelInfo.commandCooldowns[command.name] / 1000;
  }
  return cd;
  // if (
  //   channelInfo.commandCooldowns &&
  //   channelInfo.commandCooldowns[command.name]
  // ) {

  // }
};

function msToTime(ms) {
  let day, hour, minute, seconds;
  seconds = Math.floor(ms / 1000);
  minute = Math.floor(seconds / 60);
  seconds = seconds % 60;
  hour = Math.floor(minute / 60);
  minute = minute % 60;
  day = Math.floor(hour / 24);
  hour = hour % 24;
  return day
    ? hour
      ? `${day}d ${hour}h ${minute}m ${seconds}s`
      : minute
      ? `${day}d ${minute}m ${seconds}s`
      : `${day}d ${seconds}s`
    : hour
    ? `${hour}h ${minute}m ${seconds}s`
    : minute
    ? `${minute}m ${seconds}s`
    : `${seconds}s`;
}

const setCooldown = (client, command, channel, userstate) => {
  const cd = getCooldown(client, command, channel);
  if (!cd) return;

  let cooldowns;
  if (typeof command.globalCooldown === "undefined" || command.globalCooldown) {
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

  timestamps.set(userstate["user-id"], now);
  setTimeout(() => timestamps.delete(userstate["user-id"]), cooldownAmount);
};

const log = (type, path, text) => {
  console.log(
    `\u001b[36;1m<KelleeBot>\u001b[0m\u001b[34m [${path}]\u001b[0m - ${consoleColors[type]}${text}\u001b[0m`
  );
};

module.exports = {
  processArguments,
  log,
  msToTime,
  getCooldown,
  setCooldown,
};
