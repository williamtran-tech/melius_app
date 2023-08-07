'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('meal_plans', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    queryInterface.addColumn('plan_details', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('meal_plans', 'deletedAt');
    queryInterface.removeColumn('plan_details', 'deletedAt');
  }
};
