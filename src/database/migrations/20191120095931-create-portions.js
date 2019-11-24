'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('portions', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false, 
          autoIncrement: true,
          primaryKey: true
        },
        purchase_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "purchases",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        },
        status: {
          type: Sequelize.BOOLEAN 
        },
        value: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('portions');
  }
};
