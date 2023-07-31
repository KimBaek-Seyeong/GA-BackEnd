'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'aksgur1',
        name: 'aksgur1',
        password: 'd71328430c012db7e7f6d04dedce192cd71b97330e725332',
        salt: 'J5NfRf1n',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'aksgur2',
        name: 'aksgur2',
        password: '8223d4f9a149ce3181df0164672a0d5eeb605ddddfaeea4b',
        salt: 'xgqChB3q',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'hzoou',
        name: 'hzoou',
        password: 'f2819a845c8dba0524280663481f2be2ebe433349652fb14',
        salt: 'xJtX854G',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
