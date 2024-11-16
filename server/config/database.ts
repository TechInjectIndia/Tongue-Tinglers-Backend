import { Dialect } from 'sequelize';

interface Config {
  development: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
  };
  test: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
  };
  production: {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
  };
}

const config: Config = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'tongue_tingler',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'root',
    database: 'tongue_tingler',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: 'root',
    database: 'tongue_tingler',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};

export default config;