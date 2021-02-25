const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const userPokemonsSchema = mongoose.Schema({
  channel: reqString,
  user: reqString,
  pokemons: {
    pokedexNum: Number,
    name: reqString,
    caughtWith: reqString,
    caughtOn: Date,
  },
});

module.exports = mongoose.model("user-pokemons", userPokemonsSchema);
