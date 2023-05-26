import config from 'config';

export interface Config {
  api: {
    port: number;
    secretKey: string;
    logFormat: string;
    logDir: string;
    origin: string;
    credentials: boolean;
  };
  database: {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
  };
}

export const NODE_ENV = process.env.NODE_ENV;
export const DATABASE = config.get('database') as Config['database'];
export const API = config.get('api') as Config['api'];

// export default config.get('') as Config;
