module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Rentals', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },

      start: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      end: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      pick_up_lang: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      pick_up_long: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      drop_lang: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      drop_long: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      renter_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'Users', key: 'id' },
      },

      bike_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: { model: 'Bikes', key: 'id' },
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
    return queryInterface.dropTable('Rentals');
  },
};
