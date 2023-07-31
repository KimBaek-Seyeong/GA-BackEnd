'use strict';

module.exports = (sequelize, DataTypes) => {
  const Found = sequelize.define('Found', {
    title: {
      type: DataTypes.STRING,
    },
    contents: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    },
    labels: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    foundAt: {
      type: DataTypes.DATE
    },
    reward: {
      type: DataTypes.STRING
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

  Found.associate = ({User, FoundImage}) => {
    Found.belongsTo(User, {as: 'user', foreignKey: 'userId'})
    Found.hasMany(FoundImage, {as: 'images', foreignKey: 'foundId'})
  };

  return Found;

};