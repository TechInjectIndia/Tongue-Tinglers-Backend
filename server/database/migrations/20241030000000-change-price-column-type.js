'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn('products', 'price', {
            type: Sequelize.INTEGER,
            allowNull: false, // Set to true or false based on your requirements
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Change the column type back to its original type if needed
        await queryInterface.changeColumn('products', 'price', {
            type: Sequelize.STRING, // or whatever the original type was
            allowNull: false, // Set to true or false based on your original requirements
        });
    },
};
