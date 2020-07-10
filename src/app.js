require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV , API_KEY } = require('./config');
const bookmarkRouter = require('./bookmark-rought');
const logger = require('./logger');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common' ;

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(express.json());
// app.use(logger);

app.use(function errorHandler(error, req , res , next){/*eslint-disable-line*/
  let response;
  if ( NODE_ENV === 'production'){
    response = { error : {message : 'server error' } };
  }else{
    console.error(error);/*eslint-disable-line*/
    response = { message : error.message, error };
  }
  res.status(500).json(response).send();
});

app.use( (req,res,next) =>{
  const token = req.get('Authorization');
  if(!token || token.split(' ')[1] !== API_KEY){
    res.status(401).json({error:'that\'s not allowed'} );
  }
  next();
});

// app.use(bookmarkRouter)
app.use('/bookmark', bookmarkRouter);

module.exports = app;