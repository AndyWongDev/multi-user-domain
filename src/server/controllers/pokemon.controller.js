/* eslint-disable no-console */
const fetch = require('node-fetch');
const Pokemon = require('../models/pokemon.model');

const apiQuery = 'https://pokeapi.co/api/v2';

const pokemonController = {};

pokemonController.getPokemon = async (req, res, next) => {
  console.log('inside getPokemon', req.params);
  try {
    await Pokemon.findOne({ id: req.params.id }, (err, data) => {
      if (err) res.send(err);
      if (data) {
        console.log('Located Pokemon:', data.name);
        res.locals.pokemon = data;
      } else {
        console.log('New Pokemon Discovered!');
        pokemonController.postPokemon(req, res, next);
        res.locals.pokemon = 'Something';
      }
    });
  } catch (err) {
    return res.status(500).send(err);
  }
  return next();
};

pokemonController.postPokemon = async (req, res, next) => {
  console.log('inside postPokemon', req.params);
  const getData = async (pokeID) => {
    const queryUrl = `${apiQuery}/pokemon/${pokeID}`;
    try {
      const data = await fetch(queryUrl).then((rawData) => rawData.json());

      const {
        id, name, height, weight,
      } = data;

      const pokemon = {
        id,
        name,
        height,
        weight,
      };

      const query = { id };

      Pokemon.findOneAndUpdate(
        query, pokemon, {
          upsert: true,
        }, (err) => {
          if (err) throw err;
          console.log('Added Pokemon to DB', pokemon.name);
        },
      );
      res.locals.pokemon = pokemon;
      console.log('postPokemon res.locals', pokemon);
      return next();
    } catch (err) {
      return res.status(500).send(err);
    }
  };
  return getData(req.params.id);
};

module.exports = pokemonController;
