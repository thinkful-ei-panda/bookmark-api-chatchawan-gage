const express = require('express');
const bookmarkRouter = express.Router();
const store = require('./bookmark-store');
const loggers = require('./logger');
const  {v4:uuid} = require('uuid');

const uid = uuid();

bookmarkRouter
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = store.find((b) => b.id === id);

    !bookmark
      ? loggers.error(
        `i don't think we have the bookmark with id of ${id} that one`
      ) &&
        res
          .status(404)
          .send(
            'Opps, idk what happened there, maybe try coming back another time'
          )
      : '';

    res.json(bookmark);
  })

  .delete((req,res)=>{
    const { id } = req.params;
    const index = store.findIndex( a => a.id === id);
  
    index === -1 ? res.status(404).send('sorry that\'s already gone') 
    && loggers.error(
      `i don't think we have the bookmark with id of ${id} that one`)
      : store.splice(index,1) && res.status(201).send('we did the thing') ;
  });

bookmarkRouter
  .route('/')
  .get((req, res) => {
    //   throw new Error('Error makes computer fans go brrrr');
    res.status(200).json(store);
  })

  .post((req, res) => {
    const { title, url, rating, description } = req.body;
    const x = {};
    const urlR = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    x.id = uid;


    if(!title || typeof title !== 'string'){
      loggers.error(`Ayyo fam, ${title} be a busted title`);
      return  res.status(401).send(`${title} is not a valid title`);
    }else{
      x.title = title;
    } 
    if(!url || url.match(!urlR)){
      loggers.error(`Ayyo fam, ${url} be a busted url`);
      return  res.status(401).send(`${url} is not a valid url`);
    }else{
      x.url = url;
    }
    if(!rating || isNaN(Number(rating))){
      loggers.error(`Ayyo fam, ${rating} be a busted rating`); 
      return  res.status(401).send(`${rating} is not a valid rating`);
    }else{
      x.rating = Number(rating);
    }  
    
    if(!description || typeof description !== 'string'){
      loggers.error(`Ayyo fam, ${description} be a busted description`);
      return  res.status(401).send(`${description} is not a valid description`);
    }else{
      x.description = description;
    }

    store.push(x);

    res.status(200).send('Bookmark was successfully created');
  });

module.exports = bookmarkRouter;