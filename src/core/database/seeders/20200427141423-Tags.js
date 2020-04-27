'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tags', [{

      name: 'cars',

    }, {

      name: 'nature'

    }, {

      name: 'abstracts'

    }, {

      name: 'money'

    }, {

      name: 'life'

    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', null, {});
  }
};
