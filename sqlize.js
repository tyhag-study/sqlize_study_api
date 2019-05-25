require('dotenv').config();

const Sequelize = require('sequelize');
const MovieModel = require('./models/movie');
const ReviewModel = require('./models/review');
const CriticModel = require('./models/critic');

const sqlize = new Sequelize('sqliz_test', 'root', process.env.DB_PW, {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test connection Promise chain
// sqlize
//   .authenticate()
//   .then(() => {
//     return new Promise((resolve, reject) => {
//       console.log('Connected to DB.');
//       resolve();
//     })
//   })
//   .then(() => {
//     console.log('Closing connection.')
//     sqlize.close();
//   })
//   .catch(err => {
//     console.error('Error in sequelize db connection test.', err);
//   })

// Test connection async
async function testConnection() {
  try {
    await sqlize.authenticate();
    console.log('Connected to DB.');
    await sqlize.close();
    console.log('Closed DB connection.');
  } catch (err) {
    console.log('Failed Sequelize DB connection test.');
  }
}

//testConnection();

// Create Critic object
const Movie = MovieModel(sqlize, Sequelize);
const Critic = CriticModel(sqlize, Sequelize);
const Review = ReviewModel(sqlize, Sequelize);

Review.belongsTo(Critic);
Review.belongsTo(Movie);

// Sync (and reset) db
sqlize.query('SET FOREIGN_KEY_CHECKS = 0')
.then(function(){
    return sqlize.sync({ force: true });
})
.then(function(){
    return sqlize.query('SET FOREIGN_KEY_CHECKS = 1')
})
.then(function(){
    console.log('Database synchronised.');
}, function(err){
    console.log(err);
});

module.exports = {
  Movie,
  Critic,
  Review
};