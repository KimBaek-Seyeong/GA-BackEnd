'use strict';

module.exports = (sequelize, DataTypes) => {
  const Lost = sequelize.define('Lost', {
    title: {
      type: DataTypes.STRING,
    },
    contents: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    labels: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    reward: {
      type: DataTypes.STRING
    },
    lostAt: {
      type: DataTypes.DATE
    },
    isClosed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  });

  Lost.associate = ({User, LostImage}) => {
    Lost.belongsTo(User, {as: 'user', foreignKey: 'userId'})
    Lost.hasMany(LostImage, {as: 'images', foreignKey: 'lostId'})
  };

  return Lost;

};