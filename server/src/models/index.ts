import {Options, Sequelize} from 'sequelize';
import initialize from './initialize';
import config from '../config/config.json';

export * from './types';

const getSequelizeClient = () => {
    const {use_env_variable, ...sequelizeConfig} = (process.env.NODE_ENV === 'production'
        ? config.production
        : config.development) as Options & {use_env_variable?: string};
    if (use_env_variable) {
        return new Sequelize(process.env[use_env_variable]!, sequelizeConfig);
    }
    return new Sequelize(sequelizeConfig);
};

export const sequelize = getSequelizeClient();

initialize(sequelize);
