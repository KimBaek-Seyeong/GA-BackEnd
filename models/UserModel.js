'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING
    },
    avatar: {
      type: DataTypes.STRING
    },
    salt: {
      type: DataTypes.STRING
    },
    classId: {
      type: DataTypes.STRING
    }
  });

  User.associate = ({Lost, Found}) => {
  };

  return User;

};