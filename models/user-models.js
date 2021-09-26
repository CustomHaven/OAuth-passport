const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
      type: DataTypes.STRING,
      allowNull: false
  },
  google_id: {
      type: DataTypes.STRING,
      allowNull: false
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  }, {
    tableName: 'users',
    freezeTableName: false,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
)

module.exports = User