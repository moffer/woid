import Sequelize from 'sequelize';
import { NODE_ENV, DATABASE } from '@config';
import UserModel from '@models/users.model';
import { logger } from '@utils/logger';

// TODO: The ../config/default.json and the ../config/database.json have duplicate information. This is needed for sequelize-cli to work.  Need to figure out how to use the default.json file instead of this one. Or maybe just use this one and get rid of the default.json file.

const sequelize = new Sequelize.Sequelize(DATABASE.database, DATABASE.username, DATABASE.password, {
  dialect: DATABASE.dialect,
  host: DATABASE.host,
  port: DATABASE.port,
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

// sequelize.authenticate();
// test connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error: any) => {
    console.error('Unable to connect to the database:', error);
  });

export const DB = {
  Users: UserModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
