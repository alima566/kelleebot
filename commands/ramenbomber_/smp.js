module.exports = {
  name: "smp",
  category: "ramenbomber_",
  description: "Description on the Minecraft SMP Server.",
  cooldown: 60,
  globalCooldown: true,
  channel: "ramenbomber_",
  execute: ({ client, channel }) => {
    return client.say(
      channel,
      `/me SteaMPunk is a collaborative Minecraft Survival Multiplayer world featuring personalities and content creators from across Twitch and Tiktok. FEATURING: CollegeofCeliac / DitzyFlama / evuhlunnn / jkirstyn / Keveloper / Krisypaulinee / Leaveit2Liz / RamenBomber / Salinios_  / Tsunderedragon / Zachdoesntfail / Zamsire`
    );
  },
};
