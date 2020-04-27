'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('roles', [{

      type: 1, // Admin

    }, {

      type: 2 // Moderator

    }, {

      type: 3 // User

    }], {});
 },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
