'use strict';

const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );
jest.setTimeout( 10000 );

describe( 'Test Post get routes', () => {
    it( 'Get all posts', async () => {
        const response = await request.get( '/post' );
        expect( response.status ).toEqual( 200 );
    } );
} );

describe( 'Test Post post route', () => {
    it( 'Create a post', async () => {
        const res = await request.post( '/post' ).send( {
            title: 'this is a test',
            content: 'this is a test'
        } );
        expect( res.status ).toEqual( 200 );
    } );
} );

describe( 'Test Post put route', () => {
    it( 'Update a post', async () => {
        const res = await request.put( '/post/1' ).send( {
            title: 'new title new',
            content: 'new content new'
        } );
        expect( res.status ).toEqual( 201 );
    } );
} );


describe( 'Test Post delete route', () => {
    it( 'Delete a post', async () => {
        const res = await request.delete( '/post/21' );
        expect( res.status ).toEqual( 204 );
        expect( res.text ).toEqual( '' );
    } );
} );