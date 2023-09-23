'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "recipe_categories",
      [
        {
          recipeId: 652746,
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          recipeId: 652746,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("recipe_categories", null, {});
  },
};
