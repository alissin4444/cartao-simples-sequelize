'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('purchases', { 
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        user_id: {
          type: Sequelize.INTEGER,
          alloNull: false,
          references: {
            model: "users",
            key: "id"
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        status: {
          type: Sequelize.BOOLEAN,
          allowNull: true
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
       });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('purchases');
  }
};
