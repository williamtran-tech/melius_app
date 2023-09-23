'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Breakfast",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lunch",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dinner",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dessert",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Beverage",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Other",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
