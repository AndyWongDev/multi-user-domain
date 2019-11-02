const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static('assets'));
app.use(express.static('views'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/views/index.html'));
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

module.exports = PORT;
