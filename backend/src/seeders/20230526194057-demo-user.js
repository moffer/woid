'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('seed up');
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John',
        email: 'example@example.com',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lisa',
        email: 'Lisa@Lisa.com',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const users = await queryInterface.sequelize.query(`SELECT id from "Users";`);
    const userRows = users[0];

    return await queryInterface.bulkInsert(
      'Bikes',
      [
        {
          color: '#eb4034',
          description: '...',
          owner_id: userRows[0].id,
          current_location_lang: 5,
          current_location_long: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          color: '#0c2de8',
          description: '...',
          owner_id: userRows[1].id,
          current_location_lang: 7,
          current_location_long: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          color: '#19e062',
          description: '...',
          owner_id: userRows[1].id,
          current_location_lang: 9,
          current_location_long: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Bikes', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
