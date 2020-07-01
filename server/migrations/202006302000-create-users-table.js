'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userName: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
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

        await queryInterface.bulkInsert('Users', [
            {userName: 'test', password: 'test', createdAt: new Date(), updatedAt: new Date()},
            {userName: 'admin', password: 'admin', createdAt: new Date(), updatedAt: new Date()},
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Users');
    },
};
