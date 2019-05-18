const express = require('express');
const bodyParser = require('body-parser');

const { Movie, Critic } = require('./sqlize.js');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('Hi.');
  res.send('Hello');
})

// MOVIE ROUTES

app.get('/movie/:id', async (req, res) => {
  try {
    let retrievedMovie = await Movie.findAll({
      where: { id: req.params.id }
    })
    console.log(retrievedMovie[0].dataValues);
    res.status(200).send(retrievedMovie[0]);
  } catch (error) {
    res.status(400).send('Error fetching movie.');
  }
})

app.post('/movie', (req, res) => {
  // Expect JSON with 'name' a string amd 'year_released' an integer
  // Validate request body
  let name = typeof (req.body.name) == 'string' && req.body.name.length > 0 ? req.body.name : false;
  let yearReleased = typeof (req.body.year_released) == 'number' && req.body.year_released.toString().length > 0 ? req.body.year_released : false;

  if (name && yearReleased) {
    // Function to create a new movie
    async function createNewMovie() {
      let createdMovie = await Movie.create(req.body);
      console.log('Created new movie.');
      res.status(200).send(createdMovie.dataValues);
    }
    // Create a new movie
    createNewMovie();
  } else {
    res.status(400).send('Movie name and/or yearReleased parameter(s) was invalid.');
  }
})

app.post('/critic', (req, res) => {
  console.log(req.body)
  // Expect JSON with 'name' a string
  // Validate request body
  let name = typeof (req.body.name) == 'string' && req.body.name.length > 0 ? req.body.name : false;

  if (name) {
    // Function to create new critic
    async function createNewCritic() {
      let createdCritic = await Critic.create(req.body);
      console.log('Created new critic.');
      res.status(200).send(createdCritic.dataValues);
    }
    // Create new critic
    createNewCritic();
  } else {
    res.status(400).send('Critic name parameter was invalid.');
  }
})

app.listen(3000, () => {
  console.log('App listening on port 3000.');
});