import {Model, Optional} from 'sequelize';

export interface ModelAttributes {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}
export type ModelCreationAttributes<T extends ModelAttributes> = Optional<T, 'id'>;
export interface ModelClass<T extends ModelAttributes> extends Model<T, ModelCreationAttributes<T>> {}
