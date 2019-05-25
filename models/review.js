module.exports = (sequelize, type) => {
  return sequelize.define('review', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    reviewText: type.STRING(1000)
  })
}