'use strict';

const express = require( 'express' );
const router = express.Router();
const { Post, CommentModel, postModel, UserModel } = require( '../models/index' );

router.get( '/post', getAllPosts );
router.get( '/post/:id', getOnePost );
router.post( '/post', newPost );
router.put( '/post/:id', updatePost );
router.delete( '/post/:id', deletePost );




async function getAllPosts ( req, res ) {
    const comments = await CommentModel.findAll({include: [ UserModel ]});
    let posts = await postModel.findAll({include: [ UserModel ]});
    posts = posts.map( post => {
        post.dataValues.comments = comments.filter( comment => comment.postID === post.id );
        return post;
    } );
    res.status( 200 ).json( {
        posts
    } );
}

async function getOnePost ( req, res ) {
    const id = req.params.id;
    const comments = await CommentModel.findAll({where: {postID: id}, include: [ userModel ]});
    let post = await postModel.findOne({where: {id: id}, include: [ UserModel ]});
    post.dataValues.comments = comments;
    res.status( 200 ).json( post );
}

async function newPost ( req, res ) {
    const newPost = req.body;
    await Post.create( newPost )
        .then( async () => {
            await Post.read()
                .then( ( posts ) => {
                    res.status( 200 ).json( posts );
                } );
        } );
}

async function updatePost ( req, res ) {
    const id = req.params.id;
    const obj = req.body;
    const post = await Post.update( id, obj );
    res.status( 201 ).json( post );
}

async function deletePost ( req, res ) {
    const id = req.params.id;
    await Post.delete( id ).then( () => {
        res.status( 204 ).send( '' );
    } );
}



module.exports = router;