import {DataTypes, Model, Optional, Sequelize} from 'sequelize';

interface UserAttributes {
    id: number;
    userName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export default class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    id!: number;
    userName!: string;
    password!: string;
    createdAt!: Date;
    updatedAt!: Date;
}

export const init = (sequelize: Sequelize) => {
    User.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            password: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {tableName: 'Users', sequelize},
    );
};
