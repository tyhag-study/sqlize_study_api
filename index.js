const express = require('express');
const bodyParser = require('body-parser');

const Movie = require('./sqlize.js');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('Hi.');
  res.send('Hello');
})

app.post('/movie', (req, res) => {
  // Expect JSON with 'name' a string amd 'year_released' an integer
  let name = typeof(req.body.name) == 'string' && req.body.name.length > 0 ? req.body.name : false;
  let yearReleased = typeof(req.body.year_released) == 'number' && req.body.year_released.toString().length > 0 ? req.body.year_released : false;

  if(name && yearReleased){
    
  }

})


app.listen(3000, () => {
  console.log('App listening on port 3000.');
});