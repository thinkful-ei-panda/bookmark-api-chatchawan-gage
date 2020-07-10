const express = require('express');

const bookmarkRouter = express.Router();

bookmarkRouter
  .route('/bookmark')
  .get((req,res) => {
    
  })
  .post((req,res) =>{

  })
  .delete((req, res) => {

  });


module.exports= bookmarkRouter;