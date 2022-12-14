'use strict';

module.exports =  ( sequelize, DataTypes ) => sequelize.define( 'Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        defaultValue: 'test'
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
} );
