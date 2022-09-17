'use strict';

const express = require( 'express' );
const router = express.Router();
const { Post, CommentModel } = require( '../models/index' );



router.get( '/post', getAllPosts );
router.get( '/post/:id', getOnePost );
router.post( '/post', createPost );
router.put( '/post/:id', updatePost );
router.delete( '/post/:id', deletePost );




async function getAllPosts (req, res) {
    let messages = await Post.readWithComments(CommentModel);
    res.status(200).json( {
        messages
    } );
}


async function getOnePost (req, res) {
    const id = req.params.id;
    const messages = await Post.readOneWithComments(id, CommentModel);
    res.status(200).json(messages);
}


async function createPost(req, res) {
    const newPost = req.body;
    const post =  await Post.create(newPost);
    res.status(200).json(post);     

}


async function updatePost (req, res) {
    const id = req.params.id;
    const obj = req.body;
    const messages = await Post.update(id, obj);
    res.status(201).json(messages);
}


async function deletePost (req, res) {
    const id = req.params.id;
    await Post.delete(id).then( () => {
        res.status(204).send('');
    } );
}



module.exports = router;