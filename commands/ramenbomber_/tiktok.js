module.exports = {
  name: "tiktok",
  category: "ramenbomber_",
  cooldown: 15,
  globalCooldown: true,
  channel: "ramenbomber_",
  execute: ({ client, channel }) => {
    return client.say(
      channel,
      `/me Heyo! Please follow me on Tik Tok https://vm.tiktok.com/ZM8MxjXos/`
    );
  },
};
