'use strict';

const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );

describe( 'Server tests', () => {
    it( '404 route', async () => {
        const res = await request.get( '/abc' );
        expect( res.status ).toEqual( 404 );
    } );
    it( 'Home page works', async () => {
        const res = await request.get( '/' );
        expect( res.status ).toEqual( 200 );
        expect( res.text ).toEqual( '{\"message\":\"Home page\",\"code\":200}' );
    } );
} );

