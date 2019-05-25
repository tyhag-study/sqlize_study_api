module.exports = (sequelize, type) => {
  return sequelize.define('movie', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    yearReleased: type.INTEGER
  })
}