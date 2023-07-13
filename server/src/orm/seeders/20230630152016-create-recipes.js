"use strict";
const fs = require("fs");
const csv = require("fast-csv");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const csvFilePath = "seeders/RAW_recipes.csv";
    const tableName = "Recipes";
    let totalRecords = 0;
    let insertedRecords = 0;
    const batchSize = 1000; // Number of records to insert in each batch
    const delay = 3000; // Delay in milliseconds between batches
    const results = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv.parse({ headers: true }))
        .on("data", async (data) => {
          try {
            // const testParseData = {
            //   // Trim whitespace from the name
            //   name: data.name.replace(/\s+/g, " ").trim(),
            //   nutrition: data.nutrition.replace(/^['"]+|['"]+$/g, ""),
            //   cookTime: data.cookTime,
            //   nSteps: data.nSteps,
            //   steps: JSON.stringify(data.steps.replace(/'/g, '"')),
            //   nIngredients: data.nIngredients,
            //   ingredients: JSON.stringify(
            //     data.ingredients.replace(/^['"]+|['"]+$/g, "")
            //   ),
            //   createdAt: new Date(),
            //   updatedAt: new Date(),
            // };
            const testParseData = {
              // Trim whitespace from the name
              name: data.name.replace(/\s+/g, " ").trim(),
              nutrition: JSON.stringify(data.nutrition),
              cookTime: data.cookTime,
              nSteps: data.nSteps,
              steps: JSON.stringify(data.steps),
              nIngredients: data.nIngredients,
              ingredients: JSON.stringify(data.ingredients),
              createdAt: new Date(),
              updatedAt: new Date(),
            };
            // console.log("parsedData", testParseData);
            // Insert the row into the database table
            // await queryInterface.bulkInsert(tableName, [testParseData]);

            if (
              testParseData.ingredients.includes("\\") ||
              testParseData.steps.includes("\\")
            ) {
              console.log("Skipping row with backslash");
            } else {
              results.push(testParseData);
              insertedRecords++;
            }
            // Display progress
            console.log(
              `Inserted ${insertedRecords} records out of ${totalRecords}`
            );

            if (insertedRecords % batchSize === 0) {
              await queryInterface.bulkInsert(tableName, results);
              results.length = 0;
            }
          } catch (error) {
            console.error("Error inserting row:", error);
          }
        })
        .on("end", () => {
          console.log("CSV file data inserted successfully.");
          resolve();
        })
        .on("error", (error) => {
          console.error("Error reading CSV file:", error);
          reject(error);
        })
        .on("data", () => {
          totalRecords++;
        });
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Recipes", null, {});
  },
};
