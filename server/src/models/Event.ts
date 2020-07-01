import {ModelAttributes, ModelCreationAttributes} from './types';
import {Model} from 'sequelize';

export interface EventAttributes extends ModelAttributes {
    customerId: number;
    address: string;
    start: Date;
    end: Date;
    notes: string | null;
}

export default class Event extends Model<EventAttributes, ModelCreationAttributes<EventAttributes>>
    implements EventAttributes {
    id!: number;
    customerId!: number;
    address!: string;
    start!: Date;
    end!: Date;
    notes!: string | null;
    createdAt!: Date;
    updatedAt!: Date;
}
