'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const NotFound = require('./error-handlers/404');
const serverNotfound = require('./error-handlers/500');
const commentRoute = require('./routes/comment.route');
const postRoute = require('./routes/post.route');
const user = require('./routes/user.route');

app.use(cors());
app.use(express.json());
app.use(NotFound);
app.use(serverNotfound);

app.use(postRoute);
app.use(commentRoute);
app.use(user);

app.get( '/', ( req, res ) => {
    res.status( 200 ).json( {
        message: 'Home page',
        code: 200
    } );
} );

function start ( port ) {
    app.listen( port, () => console.log( `Working on ${port}` ) );
}
  
module.exports = {
    start,
    app
};