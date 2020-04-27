'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{

      name: 'Admin',
      email: "example-admin@gmail.com",
      roleId: 1

    }, {

      name: 'User',
      email: "example-user@gmail.com",
      roleId: 3

    }, {

      name: 'Moderator',
      email: "example-moderator@gmail.com",
      roleId: 2

    }, {

      name: 'User2',
      email: "example-user2@gmail.com",
      roleId: 3

    },
    {

      name: 'User3',
      email: "example-user3@gmail.com",
      roleId: 3

    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
