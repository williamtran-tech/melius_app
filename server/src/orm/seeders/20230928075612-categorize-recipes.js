"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = "recipe_categories";
    const categories = await queryInterface.sequelize.query(
      `SELECT id, name FROM categories`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    let breakfastRecipes = [];
    let lunchRecipes = [];
    let dinnerRecipes = [];
    let beverageRecipes = [];
    let dessertRecipes = [];
    let otherRecipes = [];

    const recipes = await queryInterface.sequelize.query(
      `SELECT id, name, nutrition FROM recipes`,
      { type: Sequelize.QueryTypes.SELECT }
    );
    const breakfast_naming_rule = [
      "apple",
      "eggs",
      "yogurt",
      "oatmeal",
      "cereal",
      "pancakes",
      "waffles",
      "toast",
      "breakfast",
      "muffin",
      "granola",
      "smoothie",
      "fruit",
      "sandwich",
      "bread"
    ];
    const lunch_naming_rule = [
      "lunch",
      "midday",
      "noon",
      "midday meal",
      "bento",
      "tapas",
      "sandwich",
      "soups",
      "quiches",
      "meat",
      "pork",
      "beef",
      "chicken",
      "fish",
      "seafood",
      "salad",
      "pasta",
      "pizza",
      "burger",
      "taco",
      "burrito",
      "wrap",
      "noodles",
      "rice",
      "stir-fry",
      "stew",
      "chili",
      "casserole",
      "pie",
      "curry",
      "kebab",
      "su",
    ];
    const dinner_naming_rule = [
      "dinner",
      "evening meal",
      "supper",
      "nighttime",
      "late meal",
      "roast",
      "grill",
      "steak",
      "roasted",
      "grilled",
      "baked",
      "casserole",
      "stew",
      "chili",
      "curry",
      "lasagna",
      "spaghetti",
      "barbecue",
      "pot roast",
      "meatloaf",
      "pork chops",
      "chicken",
      "beef",
      "fish",
      "seafood",
      "pasta",
      "pizza",
      "burger",
      "taco",
      "burrito",
      "noodles",
      "rice",
      "stir-fry",
      "kebab",
      "sushi",
      "sashimi",
      "hamburger",
      "hot dog",
      "steakhouse",
      "Chinese",
      "Italian",
      "Mexican",
      "Indian",
      "Thai",
      "Mediterranean",
      "Greek",
      "Japanese",
      "homemade",
    ];
    const beverage_naming_rule = [
      "drink", "beverage", "smoothie", "cocktail", "juice", "soda",
      "tea", "coffee", "milk", "shake", "lemonade", "iced tea",
      "mocktail", "water", "refreshment", "brew", "latte", "espresso"
    ]; 
    const dessert_naming_rule = [
      "dessert", "sweet", "treat", "cake", "pie", "cookie", "brownie",
      "pudding", "ice cream", "sorbet", "gelato", "chocolate", "fudge",
      "cheesecake", "mousse", "cobbler", "trifle", "tiramisu", "parfait"
    ];   
    const other_naming_rule = [
      "sauce", "condiment", "dip", "spread", "dressing", "soup", "stew", "chili"
    ];

    // if recipe name include breakfast_name_rule, then category_id = 1
    for (const recipe of recipes) {
      const wordsInRecipeName = recipe.name.toLowerCase().split(/\s+/);
      // Check if the recipe name includes any item naming rule
      const includesBreakfastItem = wordsInRecipeName.some((item) =>
        breakfast_naming_rule.includes(item)
      );
      const includesLunchItem = wordsInRecipeName.some((item) =>
        lunch_naming_rule.includes(item)
      );
      const includesDinnerItem = wordsInRecipeName.some((item) =>
        dinner_naming_rule.includes(item)
      );
      const includesBeverageItem = wordsInRecipeName.some((item) =>
        beverage_naming_rule.includes(item)
      );
      const includesDessertItem = wordsInRecipeName.some((item) =>
        dessert_naming_rule.includes(item)
      );
      const includesOtherItem = wordsInRecipeName.some((item) =>
        other_naming_rule.includes(item)
      );
      if (includesBreakfastItem) {
        console.log("BREAKFAST:", recipe.name);
        breakfastRecipes.push({
          recipeId: recipe.id,
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      if (includesLunchItem) {
        console.log("LUNCH:", recipe.name);
        lunchRecipes.push({
          recipeId: recipe.id,
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      if (includesDinnerItem) {
        console.log("DINNER:", recipe.name);
        dinnerRecipes.push({
          recipeId: recipe.id,
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      if (includesDessertItem) {
        console.log("DESSERT:", recipe.name);
        dessertRecipes.push({
          recipeId: recipe.id,
          categoryId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      if (includesBeverageItem) {
        console.log("BEVERAGE:", recipe.name);
        beverageRecipes.push({
          recipeId: recipe.id,
          categoryId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      if (includesOtherItem) {
        console.log("OTHER:", recipe.name);
        otherRecipes.push({
          recipeId: recipe.id,
          categoryId: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    await queryInterface.bulkInsert(tableName, [
      ...breakfastRecipes,
      ...lunchRecipes,
      ...dinnerRecipes,
      ...beverageRecipes,
      ...dessertRecipes,
      ...otherRecipes,
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("recipe_categories", null, {});
  },
};
