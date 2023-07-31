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
    return queryInterface.bulkInsert('Losts', [
      {
        userId: 1,
        title: 'title1',
        contents: 'contents',
        image: 'https://s3-goldax.s3.ap-northeast-2.amazonaws.com/1590214582058_ddd.jpeg',
        reward: '1000'
      },{
        userId: 2,
        title: 'title2',
        contents: 'contents',
        image: 'https://s3-goldax.s3.ap-northeast-2.amazonaws.com/1590214582058_ddd.jpeg',
        reward: '10000'
      },
      {
        userId: 1,
        title: 'title3',
        contents: 'contents',
        image: 'https://s3-goldax.s3.ap-northeast-2.amazonaws.com/1590214582058_ddd.jpeg',
        reward: '10000'
      },

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
