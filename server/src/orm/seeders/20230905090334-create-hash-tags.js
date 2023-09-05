'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "tags",
      [
        {
          name: "Learn_to_eat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Method",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("tags", null, {});
  },
};
