'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "views",
      [
        {
          postId: 1,
          view: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 2,
          view: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 3,
          view: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "reacts",
      [
        {
          postId: 1,
          isLike: 1,
          isDislike: 0,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 2,
          isLike: 0,
          isDislike: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 3,
          isLike: 1,
          isDislike: 0,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("views", null, {});
    await queryInterface.bulkDelete("reacts", null, {});
  },
};
