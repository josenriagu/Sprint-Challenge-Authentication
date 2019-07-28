require('dotenv').config(); // load .env variables

const server = require('./server');

const port = 3300;

server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
