'use strict';

const express = require( 'express' );
const cors = require( 'cors' );
const app = express();
const NotFound  = require( './error-handlers/404' );
const error  = require( './error-handlers/500' );
const postRouter = require( './routes/post.routes' );
const commentRouter = require( './routes/comment.routes' );
const userRouter = require( './routes/user.routes' );

app.use( cors({ origin : '*' }) );
app.use( express.json() );
app.use( postRouter );
app.use( commentRouter );
app.use( userRouter );

app.get( '/', ( req, res ) => {
    res.status( 200 ).json( {
        message: 'Home page',
        code: 200
    } );
} );

app.use( NotFound  );
app.use( error  );

function start ( port ) {
    app.listen( port, () => console.log( `Working on ${port}` ) );
}

module.exports = {
    start,
    app
};

