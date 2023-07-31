'use strict';

module.exports = (sequelize, DataTypes) => {
  const LostImage = sequelize.define('LostImage', {
    path: {
      type: DataTypes.STRING
    }
  });

  LostImage.associate = ({Lost}) => {
    // LostImage.belongsTo(Lost, {as: 'lost', foreignKey: 'lostId'})
  };

  return LostImage;

};