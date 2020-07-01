import {Sequelize} from 'sequelize';
import {init as initUser} from './User';

export const sequelize = new Sequelize(process.env.DATABASE_URL!, {
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

initUser(sequelize);

export {default as User} from './User';
