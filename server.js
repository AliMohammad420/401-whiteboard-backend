'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const notFoundHandler = require( './error-handlers/404' );
const errorHandler = require( './error-handlers/500' );
const postRouter = require( './routes/post.routes' );
const commentRouter = require('./routes/comment.routes');

app.use(cors());
app.use(express.json());
app.use(postRouter);
app.use(commentRouter);

app.get( '/', (req, res) => {
    res.status(200).json( {
        message:'Home page',
        code: 200
    } );
} );

app.use(notFoundHandler);
app.use(errorHandler);

function start (port) {
    app.listen(port, () => console.log( `Working on ${port}` ));
}

module.exports = {
    start,
    app
};
