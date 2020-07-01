import {Sequelize} from 'sequelize';
import initialize from './initialize';
export * from './types';

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

initialize(sequelize);
