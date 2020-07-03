import {Options, Sequelize} from 'sequelize';
import initialize from './initialize';
import config from '../../config/config.json';

export * from './types';

const sequelizeConfig = process.env.NODE_ENV === 'production' ? config.production : config.development;

export const sequelize = new Sequelize(sequelizeConfig as Options);

initialize(sequelize);
