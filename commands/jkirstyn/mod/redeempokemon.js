const { getRandomElement } = require("@utils/functions");
const userPokemonsSchema = require("@schemas/userPokemonsSchema");
const { log } = require("@utils/utils");
const fetch = require("node-fetch");

const pokeBalls = [
  "Master Ball",
  "Ultra Ball",
  "Great Ball",
  "Poke Ball",
  "Safari Ball",
  "Park Ball",
  "Sport Ball",
];

module.exports = {
  name: "redeempokemon",
  aliases: ["catch"],
  category: "Moderation/jkirstyn",
  description: "Catches a Pokemon.",
  channel: ["jkirstyn", "iaraaron"],
  cooldown: 15,
  globalCooldown: true,
  isModOnly: true,
  execute: async ({ client, channel, args }) => {
    if (args.length === 0) {
      return client.say(channel, `/me Please specify a user.`);
    }

    let user = args[0].startsWith("@")
      ? args[0].replace("@", "").toLowerCase().trim()
      : args[0].toLowerCase().trim();
    const index = getRandomElement(pokeBalls);
    const pokedexNum = Math.floor(Math.random() * 899);
    const pokeBall = pokeBalls[index];
    const pokemon = await getRandomPokemon(pokedexNum);

    const obj = {
      channel: channel.slice(1),
      user,
    };

    await userPokemonsSchema.findOneAndUpdate(
      obj,
      {
        ...obj,
        $addToSet: {
          pokemons: {
            pokedexNum,
            name: pokemon,
            caughtWith: pokeBall,
            caughtOn: new Date(),
          },
        },
      },
      {
        upsert: true,
      }
    );

    const numPokemons = await userPokemonsSchema.findOne(obj);
    const { pokemons } = numPokemons;
    return client.say(
      channel,
      `/me ${user} has captured a ${pokemon} by using a ${pokeBall}! PridePog PridePog Hope you take good care of your Pokémon! 2020Rivalry You have now caught a total of ${
        pokemons.name.length
      } Pokémon${pokemons.name.length !== 1 ? "s" : ""}!`
    );
  },
};

const getRandomPokemon = async (pokedexNum) => {
  return new Promise(async (resolve, reject) => {
    try {
      const body = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokedexNum)}`
      );
      const result = await body.json();
      const pokemon = capFirstLetter(result.species.name);
      resolve(pokemon);
    } catch (e) {
      log("ERROR", "./jkirstyn/mod/redeempokemon.js", e.message);
      reject(e);
    }
  });
};

const capFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
