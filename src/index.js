const express = require('express');
const app = express();
const port = 3000;

const cacheRoutes = require('./routes/cacheRoutes');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/cache', cacheRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});