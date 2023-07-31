'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('LostImages', [
      {
        lostId: 1,
        path: 'https://s3-goldax.s3.ap-northeast-2.amazonaws.com/1590214582058_ddd.jpeg'
      },
      {
        lostId: 1,
        path: 'https://s3-goldax.s3.ap-northeast-2.amazonaws.com/1590214582058_ddd.jpeg'
      },
      {
        lostId: 1,
        path: 'https://s3-goldax.s3.ap-northeast-2.amazonaws.com/1590214582058_ddd.jpeg'
      },
      {
        lostId: 1,
        path: 'https://s3-goldax.s3.ap-northeast-2.amazonaws.com/1590214582058_ddd.jpeg'
      },
      {
        lostId: 2,
        path: 'https://s3-goldax.s3.ap-northeast-2.amazonaws.com/1590214582058_ddd.jpeg'
      },
      {
        lostId: 2,
        path: 'https://s3-goldax.s3.ap-northeast-2.amazonaws.com/1590214582058_ddd.jpeg'
      },
      {
        lostId: 2,
        path: 'https://s3-goldax.s3.ap-northeast-2.amazonaws.com/1590214582058_ddd.jpeg'
      }
    ])
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
