var bodyParser = require('body-parser')
const express = require('express');
const app = express();
const port = 3000;

const cacheRoutes = require('./routes/cacheRoutes');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/cache', cacheRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});