const db = require('../db')
const {DataTypes} = require('sequelize')

const Session = db.define('session', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  }
})

module.exports = Session
