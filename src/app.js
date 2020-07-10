require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV , API_KEY } = require('./config');
const winston = require('winston');
const bookmarkRouter = express.Router()


const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common' ;

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use(function errorHandler(error, req , res , next){/*eslint-disable-line*/
  let response;
  if ( NODE_ENV === 'production'){
    response = { error : {message : 'server error' } };
  }else{
    logger.add(new winston.transports.Console({format:winston.format.simple()}));
    console.error(error);/*eslint-disable-line*/
    response = { message : error.message, error };
  }
  res.status(500).json(response).send();
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename : 'info.log'
    })
  ]
});

app.use( (req,res,next) =>{
  const token = req.get('Authorization');
  if(!token || token.split(' ')[1] !== API_KEY){
    res.status(401).json({error:'that\'s not allowed'} );
  }
  next();
});


// app.use(bookmarkRouter)
bookmarkRouter.get( '/', (req,res) => {
//   throw new Error('Error makes computer fans go brrrr');
  res.status(200).send('OwO wi mwaking gwod pwa gwas!');
});

module.exports = app;