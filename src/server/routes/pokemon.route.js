const express = require('express');

const router = express.Router();

const pokemonController = require('../controllers/pokemon.controller');

router.get('/id/:id', pokemonController.getPokemon, (req, res, next) => {
  res.status(200).json(res.locals.pokemon);
  next();
});

router.post('/id/:id', pokemonController.postPokemon, (req, res, next) => {
  res.status(200).json(res.locals.pokemon);
  next();
});

module.exports = router;
