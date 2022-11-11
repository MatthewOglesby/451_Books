require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const server = express();
const PORT = 3001;

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use((req, res, next) => {
  console.log('Hitting server')
  next();
})

const apiRouter = require('./api');
server.use('/api', apiRouter);

apiRouter.use('*', (req, res,) => {
  res.status(404).send({
    error: 'unknownpage',
    name: 'badURL',
    message: 'wrong route'
  });
 
})

apiRouter.use((error, req, res, next) => {
    
    res.send({
      error: error.error,
      name: error.name,
      message: error.message
    });
  });



server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})
