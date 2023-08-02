"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "ingre_categories",
      [
        {
          name: "Baked Products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Beef Products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Beverages",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cereal Grains and Pasta",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dairy and Egg Products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fats and Oils",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Finfish and Shellfish Products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fruits and Fruit Juices",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Legumes and Legume Products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nut and Seed Products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pork Products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Poultry Products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Restaurant Foods",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sausages and Luncheon Meats",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Soups, Sauces, and Gravies",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Spices and Herbs",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sweets",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Vegetables and Vegetable Products",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   name: "Milk and Milk Products",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   name: "Meat, Poultry, Fish, and Mixtures",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   name: "Eggs",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   name: "Dry Beans, Peas, Other Legumes, Nuts, and Seeds",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   name: "Grain Products",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   name: "Fruits",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   name: "Vegetables",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   name: "Fats, Oils, and Salad Dressings",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   name: "Sugars, Sweets, and Beverages",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ingre_categories", null, {});
  },
};
