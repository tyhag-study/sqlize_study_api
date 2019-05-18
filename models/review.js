module.exports = (sequelize, type) {
  return sequelize.define('review', {
    id: {
      type: type.INTEGER,
      primarykey: true,
      autoIncrement: true
    },
    text: type.STRING(1000)
    rating: {
      type: type.INTEGER,
      defaultValue: null
  })
}