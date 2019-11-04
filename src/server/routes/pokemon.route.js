const express = require('express');

const router = express.Router();

const pokemonController = require('../controllers/pokemon.controller');

router.get('/id/:id', pokemonController.getPokemon, (req, res, next) => {
  res.status(200).json(res.locals.pokemon);
  next();
});

router.post('/id/:id', (req, res, next) => {
  pokemonController.postPokemon(req, res, next);
  next();
});

module.exports = router;
