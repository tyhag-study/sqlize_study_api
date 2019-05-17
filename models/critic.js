module.exports = (sequelize, type) => {
  return sequelize.define('critic', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING
  })
}