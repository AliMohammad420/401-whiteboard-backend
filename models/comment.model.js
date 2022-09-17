'use strict';

const Comment = ( sequelize, DataTypes ) => sequelize.define( 'Comment', {
    postID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING    }
} );

module.exports = Comment;