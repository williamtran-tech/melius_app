"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ingre_categories",
      [
        {
          name: "Milk and Milk Products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Meat, Poultry, Fish, and Mixtures",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Eggs",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dry Beans, Peas, Other Legumes, Nuts, and Seeds",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Grain Products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fruits",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Vegetables",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fats, Oils, and Salad Dressings",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sugars, Sweets, and Beverages",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ingre_categories", null, {});
  },
};
