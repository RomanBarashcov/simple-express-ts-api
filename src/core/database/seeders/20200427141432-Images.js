'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('images', [{

      source: 'http://bucket/images/porsche.911.jpg',
      title: 'my favorite car',
      description: '#cars#life'

    }, {

      source: 'http://bucket/images/tree.jpg',
      title: 'tree',
      description: '#life#nature'

    }, {

      source: 'http://bucket/images/sea.jpg',
      title: 'sea',
      description: '#life#sea'

    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('images', null, {});
  }
};
