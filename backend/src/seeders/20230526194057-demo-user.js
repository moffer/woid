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
      {
        name: 'CheapJo',
        email: 'cheap@jo.com',
        password: 'hashedPassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const users = await queryInterface.sequelize.query(`SELECT id from "Users";`);
    const userRows = users[0];

    await queryInterface.bulkInsert('Bikes', [
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
    ]);

    const bikes = await queryInterface.sequelize.query(`SELECT id from "Bikes";`);
    const bikeRows = bikes[0];

    return await queryInterface.bulkInsert('Rentals', [
      {
        start: new Date(),
        end: new Date(),
        renter_id: userRows[2].id,
        bike_id: bikeRows[0].id,
        pick_up_lang: 5,
        pick_up_long: 6,
        drop_lang: 5,
        drop_long: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: new Date(),
        end: new Date(),
        renter_id: userRows[2].id,
        bike_id: bikeRows[1].id,
        pick_up_lang: 5,
        pick_up_long: 6,
        drop_lang: 5,
        drop_long: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: new Date(),
        end: new Date(),
        renter_id: userRows[1].id,
        bike_id: bikeRows[1].id,
        pick_up_lang: 5,
        pick_up_long: 6,
        drop_lang: 5,
        drop_long: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        start: new Date(),
        end: new Date(),
        renter_id: userRows[2].id,
        bike_id: bikeRows[2].id,
        pick_up_lang: 5,
        pick_up_long: 6,
        drop_lang: 5,
        drop_long: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rentals', null, {});
    await queryInterface.bulkDelete('Bikes', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  },
};
