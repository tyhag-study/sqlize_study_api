const express = require('express');
const bodyParser = require('body-parser');

const { Movie, Critic, Review } = require('./sqlize.js');

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
  let yearReleased = typeof (req.body.yearReleased) == 'number' ? req.body.yearReleased : false;

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


// CRITIC ROUTES

app.get('/critic/:id', async (req, res) => {
  try {
    let retrievedCritic = await Critic.findAll({
      where: { id: req.params.id }
    })
    console.log(retrievedCritic[0].dataValues);
    res.status(200).send(retrievedCritic[0]);
  } catch (error) {
    res.status(400).send('Error fetching critic.');
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

// REVIEW ROUTES

app.post('/review', (req, res) => {
  console.log(req.body);
  // Expect JSON with movie_id a number, critic_id a number, review_body a string, optional rating a number between 1 and 5
  // Validate request body
  let movieId = typeof (req.body.movieId) == 'number' ? req.body.movieId : false;
  let criticId = typeof (req.body.criticId) == 'number' ? req.body.criticId : false;
  let reviewText = typeof (req.body.reviewText) == 'string' && req.body.reviewText.length > 0 ? req.body.reviewText : false;

  if (movieId && criticId && reviewText) {
    async function createNewReview() {
      let testReturn = {};
      let reviewedMovie = await Movie.findAll({ where: { id: movieId } });
      let criticSubmittingReview = await Critic.findAll({ where: { id: criticId } });

      if (reviewedMovie.length > 0 && criticSubmittingReview.length > 0) {
        let newlyCreatedMovie = await Review.create(req.body);
        res.status(200).send(newlyCreatedMovie.dataValues);
      } else {
        res.status(400).send(
          { 'error': 'Invalid parameters, or movie and/or critic not found.' }
        )
      }
    }
    createNewReview();
  } else {
    res.status(400).send(
      { 'error': 'Invalid parameters. movieId, criticId, or reviewText did not match expected values.' }
    )
  }

})



app.listen(3000, () => {
  console.log('App listening on port 3000.');
});