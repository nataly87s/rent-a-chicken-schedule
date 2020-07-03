'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Customers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            phoneNumber: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            notes: Sequelize.STRING,
            archived: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        await queryInterface.bulkInsert('Customers', [
            {
                firstName: 'Natalya',
                lastName: 'Shrits',
                phoneNumber: '615-278-0965',
                email: 'nshrits@wgu.edu',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstName: 'Billy',
                lastName: 'Rabbit',
                phoneNumber: '564-987-9909',
                email: 'thebestrabbitinthewest@gmail.com',
                notes: 'Old Billy is a pretty cool guy but he eats way too many carrots.',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                firstName: 'Winnie',
                lastName: 'Pooh',
                phoneNumber: '337-437-9776',
                email: 'winnie.pooh@disney.com',
                notes: 'Loves honey',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        await queryInterface.createTable('Events', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            customerId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Customers',
                    key: 'id',
                },
            },
            address: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            start: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            end: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            notes: Sequelize.STRING,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        await queryInterface.bulkInsert('Events', [
            {
                customerId: 1,
                address: 'Lorem ipsum dolor sit amet',
                start: new Date(2020, 5, 1, 9),
                end: new Date(2020, 5, 1, 11),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                customerId: 1,
                address: 'consectetur adipiscing elit',
                start: new Date(2020, 5, 14, 14),
                end: new Date(2020, 5, 14, 18),
                notes: 'Excepteur sint occaecat cupidatat',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                customerId: 1,
                address: 'The beach',
                start: new Date(2020, 11, 8, 9),
                end: new Date(2020, 11, 8, 13),
                notes: 'Birthday party',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                customerId: 2,
                address: 'Nissan Stadium',
                start: new Date(2020, 6, 4, 19),
                end: new Date(2020, 6, 4, 20),
                notes: '4th of July fireworks',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                customerId: 2,
                address: 'sed do eiusmod tempor incididunt',
                start: new Date(2020, 5, 7, 10),
                end: new Date(2020, 5, 7, 13),
                notes: 'ad minim veniam, quis nostrud exercitation',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                customerId: 3,
                address: 'ut labore et dolore magna aliqua',
                start: new Date(2020, 5, 20, 16),
                end: new Date(2020, 5, 20, 18),
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Events');
        await queryInterface.dropTable('Customers');
    },
};
