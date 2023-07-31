'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return Promise.all([
      queryInterface.addColumn('Founds', 'isClosed', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
      queryInterface.addColumn('Losts', 'isClosed', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return Promise.all([
      queryInterface.removeColumn('Founds', 'isClosed'),
      queryInterface.removeColumn('Losts', 'isClosed')

    ])
  }
};
