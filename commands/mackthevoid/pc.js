module.exports = {
  name: "pc",
  aliases: ["podcast"],
  category: "mackthevoid",
  cooldown: 15,
  channel: "mackthevoid",
  execute: ({ client, channel }) => {
    return client.say(
      channel,
      `/me Please check out my podcast with @jkirstyn https://rezplz.sounder.fm/ Spotify: https://open.spotify.com/show/5eEd2tPX4ejcrIuahx2ySk?si=_Hi_9u0tQcSpMNxK5M7Sgg Apple Podcast: https://podcasts.apple.com/us/podcast/rezplz/id1534510832`
    );
  },
};
