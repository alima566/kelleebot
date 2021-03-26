const fetch = require("node-fetch");
const { utcToZonedTime, format } = require("date-fns-tz");
const { formatDistance } = require("date-fns");

const headers = {
  "client-id": process.env.TWITCH_CLIENT_ID,
  Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
};

module.exports = {
  name: "accountage",
  category: "jkirstyn",
  cooldown: 15,
  channel: "jkirstyn",
  execute: async ({ client, channel, userstate }) => {
    const account = await getAccountAge(userstate);
    if (account) {
      if (account.data.length) {
        const { login, created_at } = account.data[0];
        const timeFormat = "EEE, MMM d, yyyy h:mm a zzz";
        const createdAtEasternDate = utcToZonedTime(
          created_at,
          "America/New_York"
        );
        const msg = `${format(createdAtEasternDate, timeFormat, {
          timeZone: "America/New_York",
        })} (${formatDistance(new Date(created_at), new Date(), {
          addSuffix: true,
        })})`;

        return client.say(
          channel,
          `/me ${login}, your account was created on ${msg}.`
        );
      }
    }
  },
};

const getAccountAge = (userstate) => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.twitch.tv/helix/users?id=${userstate["user-id"]}`;
    try {
      const body = await fetch(url, { headers });
      const result = await body.json();
      resolve(result);
    } catch (e) {
      console.log(e);
      reject("An error occurred. Please try again in a few moments.");
    }
  });
};
