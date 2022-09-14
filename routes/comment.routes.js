'use strict';

const express = require( 'express' );
const router = express.Router();

const { Comment } = require( '../models/index' );

router.get('/comment', getAllComments);
router.post("/comment", createComment);
router.put("/comment/:id", updateComment);
router.delete("/comment/:id",deleteComment);

async function getAllComments(req, res) {
  let allComments = await Comment.read();
  res.status(200).json({
    allComments,
  });
}

async function createComment(req, res) {
  const newComment = req.body;
  const comment = await Comment.create(newComment);
  res.status(201).json(comment);
}

async function updateComment(req, res) {
  const id = req.params.id;
  const obj = req.body;

  const comment = await Comment.update(id, obj);
  res.status(202).json(comment);
}

async function deleteComment(req, res) {
  const id = req.params.id;
  await Comment.delete(id);
  res.status(204).send("Comment deleted successfully");
}


module.exports = router;
