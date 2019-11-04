/* eslint-disable no-console */
const fetch = require('node-fetch');
const Pokemon = require('../models/pokemon.model');

const apiQuery = 'pokeapi.co/api/v2/';

const pokemonController = {};

pokemonController.getPokemon = (req, res, next) => {
  Pokemon.findOne({ id: req.params.id }, (err, data) => {
    if (err) res.send(err);
    if (data) {
      res.locals.pokemon = data;
      console.log('Found Pokemon: ', data.name);
    } else {
      console.log('New Pokemon Discovered!');
      fetch(`/pokemon/${req.params.id}`, { method: 'POST' });
    }
    next();
  });
};

pokemonController.postPokemon = async (req, res, next) => {
  const data = await fetch(`${apiQuery}/pokemon/${req.params.id}`).json();
  const {
    id, name, height, weight,
  } = data;

  const pokemon = new Pokemon({
    id,
    name,
    height,
    weight,
  });

  const filter = { id, name };
  const update = {
    id, name, height, weight,
  };

  pokemon.findOneAndUpdate(
    filter, update, {
      upsert: true,
    },
  );
  res.locals.pokemon = data;
  next();
};

module.exports = pokemonController;
