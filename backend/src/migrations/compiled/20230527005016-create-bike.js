module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('bikes', {
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
        references: { model: 'users', key: 'id' },
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('bikes');
  },
};
