'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "topics",
      [
        {
          name: "QnA",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sharing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Experience",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("topics", null, {});
  },
};
