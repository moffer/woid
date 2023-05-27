'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    console.log('seed up');
    await queryInterface.bulkInsert('users', [
      {
        name: 'John',
        email: 'example@example.com',
        password: 'hashedPassword',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Lisa',
        email: 'Lisa@Lisa.com',
        password: 'hashedPassword',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'CheapJo',
        email: 'cheap@jo.com',
        password: 'hashedPassword',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    const users = await queryInterface.sequelize.query(`SELECT id from "users";`);
    const userRows = users[0];

    await queryInterface.bulkInsert('bikes', [
      {
        color: '#eb4034',
        description: '...',
        owner_id: userRows[0].id,
        current_location_lang: 5,
        current_location_long: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        color: '#0c2de8',
        description: '...',
        owner_id: userRows[1].id,
        current_location_lang: 7,
        current_location_long: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        color: '#19e062',
        description: '...',
        owner_id: userRows[1].id,
        current_location_lang: 9,
        current_location_long: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    const bikes = await queryInterface.sequelize.query(`SELECT id from "bikes";`);
    const bikeRows = bikes[0];

    return await queryInterface.bulkInsert('rentals', [
      {
        start: new Date(),
        end: new Date(),
        renter_id: userRows[2].id,
        bike_id: bikeRows[0].id,
        pick_up_lang: 5,
        pick_up_long: 6,
        drop_lang: 5,
        drop_long: 6,
        created_at: new Date(),
        updated_at: new Date(),
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
        created_at: new Date(),
        updated_at: new Date(),
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
        created_at: new Date(),
        updated_at: new Date(),
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
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rentals', null, {});
    await queryInterface.bulkDelete('bikes', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
