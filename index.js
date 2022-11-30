require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { getUserById } = require('./db/users')
const jwt = require('jsonwebtoken')
const { client } = require('./db/client');

client.connect();

const server = express();
const PORT = process.env.PORT || 3001

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use((req, res, next) => {
  console.log('Hitting server')
  next();
})

server.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { // nothing to see hereac
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message:` Authorization token must start with ${ prefix }`
    });
  }
});
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
