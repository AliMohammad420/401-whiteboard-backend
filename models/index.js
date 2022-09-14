'use strict';

const { Sequelize, DataTypes } = require( 'sequelize' );
const post = require( './post.model' );
const comment = require('./comment.model');
const POSTGRES_URL = process.env.DATABASE_URL || "postgresql://ali:1470@localhost:5432/ali";
const collection = require("../collections/userCommentRoutes")

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};

let sequelize = new Sequelize( POSTGRES_URL, sequelizeOption );
const commentModel = comment(sequelize,DataTypes);
const postModel = post(sequelize, DataTypes);


postModel.hasMany(commentModel, {foreignKey: 'postID', sourceKey: 'id'}) 
commentModel.belongsTo(postModel, {foreignKey: 'postID', targetKey: 'id'})

const postCollection = new collection(postModel);
const commentCollection =new collection(commentModel);

module.exports = {
    db: sequelize,
    Post: postModel,
    CommentModel: commentModel,
    Post: postCollection,
    Comment: commentCollection
};

