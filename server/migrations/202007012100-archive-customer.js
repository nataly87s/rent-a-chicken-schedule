'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Customers', 'archived', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Customers', 'archived');
    },
};
