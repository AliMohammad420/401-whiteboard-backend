'use strict';

const Post = ( sequelize, DataTypes ) => sequelize.define( 'Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Hello'
    },
    content: {
        type: DataTypes.STRING,
        defaultValue: "Welcome"
    }
} );

module.exports = Post;


