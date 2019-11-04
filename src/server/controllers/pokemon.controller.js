/* eslint-disable no-console */
const fetch = require('node-fetch');
const Pokemon = require('../models/pokemon.model');

const apiQuery = 'https://pokeapi.co/api/v2';

const pokemonController = {};

pokemonController.getPokemon = (req, res, next) => {
  console.log('inside getPokemon', req.params);
  Pokemon.findOne({ id: req.params.id }, (err, data) => {
    console.log('data', data);
    if (err) res.send(err);
    if (data) {
      res.locals.pokemon = data;
      console.log('Found Pokemon: ', data);
    } else {
      console.log('New Pokemon Discovered!');
      this.pokemonController.postPokemon(req, res, next);
    }
    next();
  });
};

pokemonController.postPokemon = async (req, res, next) => {
  console.log('inside postPokemon', req.params);
  const queryUrl = `${apiQuery}/pokemon/${req.params.id}`;
  const getData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();

      res.locals.pokemon = json.name;

      const {
        id, name, height, weight,
      } = json;

      const pokemon = new Pokemon({
        id,
        name,
        height,
        weight,
      });

      const filter = { id, name };

      Pokemon.findOneAndUpdate(
        filter, pokemon, {
          upsert: true,
        },
      );

      next();
    } catch (err) {
      console.error(err);
    }
  };
  getData(queryUrl);
};

module.exports = pokemonController;
