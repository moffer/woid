module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bikes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },

      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      color: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      current_location_lang: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },

      current_location_long: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },

      owner_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bikes');
  },
};
