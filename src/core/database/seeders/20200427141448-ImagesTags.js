'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('image_tags', [{

      imageId: 1,
      tagId: 1

    }, {

      imageId: 1,
      tagId: 4

    }, {

      imageId: 1,
      tagId: 5

    }, {

      imageId: 2,
      tagId: 2

    }, {

      imageId: 2,
      tagId: 5

    }, {

      imageId: 3,
      tagId: 2

    }, {

      imageId: 3,
      tagId: 5

    }], {});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('image_tags', null, {});
  }
};
