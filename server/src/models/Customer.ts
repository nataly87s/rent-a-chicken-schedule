import {Model} from 'sequelize';
import {ModelAttributes, ModelCreationAttributes} from './types';

export interface CustomerAttributes extends ModelAttributes {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    notes: string | null;
    archived: boolean;
}

export default class Customer extends Model<CustomerAttributes, ModelCreationAttributes<CustomerAttributes>>
    implements CustomerAttributes {
    id!: number;
    firstName!: string;
    lastName!: string;
    phoneNumber!: string;
    email!: string;
    notes!: string | null;
    createdAt!: Date;
    updatedAt!: Date;
    archived!: boolean;
}
