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


describe(' server is working', () => {
    it('should return 200', async () => {
        const response = await request.get( '/' );
        expect( response.status ).toEqual( 200 );
    } );
}
);

describe('post route is working', () => {
    it('should return 200', async () => {
        const response = await request.get( '/post' );
        expect( response.status ).toEqual( 200 );
    } );
}
);


describe('comment route is working', () => {
    it('should return 200', async () => {
        const response = await request.get( '/comment' );
        expect( response.status ).toEqual( 200 );
    } );
}
);