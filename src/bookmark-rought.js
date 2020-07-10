const express = require('express');

const bookmarkRouter = express.Router();
const store = require('./bookmark-store');
const { loggers } = require('winston');

bookmarkRouter
  .route('/bookmark/:id')
  .get((req,res) => {
    const { id } = req.params;
    const bookmark = store.find(b =. c.id === id);

    !bookmark ? loggers.error(`i don't think we have the bookmark with id of ${id} that one`)
      && res.status(404).send('OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! n\ A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!') 
      : '' ;


    res.json(store);
  })
  
  .delete((req, res) => {
    const { id } = req.params
    const index = store.findIndex(e => e.id === Number(id))

    if (index === -1) {
      res.send('No ID found')
    }

    res.send('Found ID and deleted!')
  });

bookmarkRouter 
  .route('/bookmark')
  .get ((req,res) => {
    res.send('get bookmark working')
  })

  .post((req,res) =>{
    
    res.json(store);
  })


module.exports= bookmarkRouter;