const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const {validateUser, authenticate} = require('./database/helpers/middleware');
const authRouter = require('./auth/authRouter');
const mainRouter = require('./main/mainRouter');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use('/api/main', authenticate, mainRouter);
server.use('/api/auth', validateUser, authRouter);

server.get('/', (req, res) => {
   try {
      res.status(200).json('Trust the Process. Do not Panic!')
   } catch (error) {
      res.status(500).json('Auch!, let\'s rewire some connections together')
   }
});

module.exports = server;
