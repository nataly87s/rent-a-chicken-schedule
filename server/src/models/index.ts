import {Options, Sequelize} from 'sequelize';
import initialize from './initialize';
import config from '../config/config.json';

export * from './types';

const sequelizeConfig = process.env.NODE_ENV === 'production' ? config.production : config.development;

console.log('startup', process.env.NODE_ENV, sequelizeConfig);
console.log('DATABASE_URL', process.env.DATABASE_URL);

export const sequelize = new Sequelize(sequelizeConfig as Options);

initialize(sequelize);
