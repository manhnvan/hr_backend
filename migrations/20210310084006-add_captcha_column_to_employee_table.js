'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('employee', 'login_failed_count', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
    await queryInterface.addColumn('employee', 'captcha', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('employee', 'is_captcha_available', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('employee', 'login_failed_count')
    await queryInterface.removeColumn('employee', 'captcha')
    await queryInterface.removeColumn('employee', 'is_captcha_available')
  }
};
