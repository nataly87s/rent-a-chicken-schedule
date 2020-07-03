import {Model} from 'sequelize';
import {ModelAttributes, ModelCreationAttributes} from './types';

export interface UserAttributes extends ModelAttributes {
    userName: string;
    password: string;
}

export default class User extends Model<UserAttributes, ModelCreationAttributes<UserAttributes>>
    implements UserAttributes {
    id!: number;
    userName!: string;
    password!: string;
    createdAt!: Date;
    updatedAt!: Date;
}
