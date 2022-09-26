'use strict';

const express = require( 'express' );
const router = express.Router();
const { Post, CommentModel } = require( '../models/index' );
const bearerAuth = require( '../middlewares/bearerAuth' );
const role = require( '../middlewares/role' );

router.get( '/post', bearerAuth, role('read') ,getAllPosts );
router.get( '/post/:id', role('read'),getOnePost );
router.post( '/post', role('create'),newPost );
router.put( '/post/:id', role('update'), updatePost );
router.delete( '/post/:id', role('delete'),deletePost );




async function getAllPosts ( req, res ) {
    let posts = await Post.readWithComments( CommentModel );
    res.status( 200 ).json( {
        posts
    } );
}

async function getOnePost ( req, res ) {
    const id = req.params.id;
    const post = await Post.readWithComments( id, CommentModel );
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