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
            'OOPSIE WOOPSIE!! Uwu We made a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquarters are working VEWY HAWD to fix this!'
          )
      : '';

    res.json(bookmark);
  })

  .delete((req, res) => {
    const { id } = req.params;
    const index = store.findIndex((e) => e.id === Number(id));

    if (index === -1) {
      res.send('No ID found');
    }

    res.send('Found ID and deleted!');
  });

bookmarkRouter
  .route('/')
  .get((req, res) => {
    //   throw new Error('Error makes computer fans go brrrr');
    res.status(200).json(store);
  })

  .post((req, res) => {
    const { title, url, name, rating, description } = req.body;
    const x = {};
    const urlR = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm;
    x.id = uid;

    !title || typeof title !== 'string'
      ? loggers.error(`Ayyo fam, ${title} be a busted title`) &&
        res.status(401).send(`${title} is not a valid title`)
      : x.title = title;
    !url || url.match(!urlR)
      ? loggers.error(`Ayyo fam, ${url} be busted`) &&
        res.status(401).send(`${url} is not a valid url`)
      : x.url = url;
    !name || typeof name !== 'string'
      ? loggers.error(`Ayyo fam, ${name} be busted`) &&
        res.status(401).send(`${name} is not a valid name`)
      : x.name = name;
    !rating || isNaN(Number(rating))
      ? loggers.error(`Ayyo fam, ${rating} be busted`) &&
        res.status(401).send(`${rating} is not a valid rating`)
      : x.rating = Number(rating);
    !description || typeof description !== 'string'
      ? loggers.error(`Ayyo fam, ${description} be busted`) &&
        res.status(401).send(`${description} is not a valid description`)
      : x.description = description;

    store.push(x);

    res.status(200).send('Bookmark was successfully created');
  });

module.exports = bookmarkRouter;