'use strict';

module.exports = (sequelize, DataTypes) => {
  const FoundImage = sequelize.define('FoundImage', {
    path: {
      type: DataTypes.STRING
    }
  });

  FoundImage.associate = (models) => {
  };

  return FoundImage;

};