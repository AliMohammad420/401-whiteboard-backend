'use strict';

const { Sequelize, DataTypes } = require( 'sequelize' );
const post = require( './post.model' );
const comment = require('./comment.model')
const POSTGRES_URL = process.env.DATABASE_URL || "postgres://hoagnjlxpglipl:546e7e4ba56b57b25f9bd074b192b7c0f571cc258b44911f6f04374a844a30aa@ec2-52-210-97-223.eu-west-1.compute.amazonaws.com:5432/drrmc4j9kthha";
const collection = require('../collections/user-comment-routes')
const user = require('./user.model');


const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
};

let sequelize = new Sequelize( POSTGRES_URL, sequelizeOption );
const postModel = post(sequelize, DataTypes);
const commentModel = comment(sequelize,DataTypes);
const userModel = user(sequelize,DataTypes);


postModel.hasMany(commentModel, {foreignKey: 'ownerID', sourceKey: 'id'})
commentModel.belongsTo(postModel, {foreignKey: 'ownerID', targetKey: 'id'})

const postCollection = new collection(postModel);
const commentCollection =new collection(commentModel);



module.exports = {
    db: sequelize,
    Post: postCollection,
    Comment: commentCollection,
    CommentModel: commentModel,
    UserModel: userModel
};