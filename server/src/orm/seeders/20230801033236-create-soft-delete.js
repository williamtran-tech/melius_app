'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('users', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    queryInterface.addColumn('available_ingredients', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    queryInterface.addColumn('allergies', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('users', 'deletedAt');
    queryInterface.removeColumn('available_ingredients', 'deletedAt');
    queryInterface.removeColumn('allergies', 'deletedAt');
  }
};
