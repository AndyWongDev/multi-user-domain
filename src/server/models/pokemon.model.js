/* eslint-disable no-console */
const mongoose = require('mongoose');

const spriteModel = require('./sprite.model');
const typeModel = require('./type.model');

const myURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-hjp5j.mongodb.net/pokemon?retryWrites=true&w=majority`;

mongoose.connect(process.env.MONGO_URI || myURI, {
  useFindAndModify: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to the database!', process.env.DB_USER);
});

const pokemonSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  height: { type: Number },
  weight: { type: Number },
  type: { type: [typeModel] },
  sprite: { type: spriteModel },
});

const pokemon = mongoose.model('Pokemon', pokemonSchema);

module.exports = pokemon;
