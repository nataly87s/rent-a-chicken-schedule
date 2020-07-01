import {DataTypes, Sequelize} from 'sequelize';
import User from './User';
import Customer from './Customer';
import Event from './Event';

const initialize = (sequelize: Sequelize) => {
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

    Customer.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            firstName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            lastName: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            phoneNumber: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            email: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            notes: DataTypes.STRING,
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {tableName: 'Customers', sequelize},
    );

    Event.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            customerId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: 'Customers',
                    key: 'id',
                },
            },
            address: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            start: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            end: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            notes: DataTypes.STRING,
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {tableName: 'Events', sequelize},
    );
};

export default initialize;
