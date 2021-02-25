const userPokemonsSchema = require("@schemas/userPokemonsSchema");
const { log } = require("@utils/utils");

module.exports = {
  name: "pokemon",
  category: "jkirstyn",
  description: "Tells you what Pokémons you have caught.",
  cooldown: 15,
  channel: ["jkirstyn"],
  execute: async ({ client, channel, userstate }) => {
    const obj = {
      channel: channel.slice(1),
      user: userstate.username,
    };
    try {
      const result = await userPokemonsSchema.find(obj);
      if (!result.length) {
        return client.say(
          channel,
          `/me ${userstate.username}, you have not caught any Pokémon's yet.`
        );
      }

      const totalPokemons = result[0].pokemons.name.length;
      const pokemons = result[0].pokemons.name
        .map((m) => m)
        .slice(0, 5)
        .join(", ");

      return client.say(
        channel,
        `/me ${
          userstate.username
        }, you have caught a total of ${totalPokemons} Pokémon${
          totalPokemons !== 1 ? "s" : ""
        }! Here is your Pokédex: ${pokemons}.`
      );
    } catch (e) {
      log("ERROR", "./jkirstyn/pokemon.js", e.message);
      return client.say(
        channel,
        `/me An error has occurred. Please try again.`
      );
    }
  },
};
