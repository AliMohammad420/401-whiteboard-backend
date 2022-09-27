'use strict';

const supertest = require('supertest');
const server = require('../server');
const request = supertest(server.app);


describe('Test User signup route', () => {
    it( 'Signup a user with wrong email', async () => {
        const res = await request.post('/signup').send( {
            username: 'ali',
            email: 'aliali.com',
            password: '1234'
        } );
        expect(res.status).toEqual(409);
    } );

    it( 'Signup a user with existing email', async () => {
        const res = await request.post('/signup').send( {
            username: 'ali',
            email: 'ali@ali.com',
            password: '123'
        } );
        expect(res.status).toEqual(409);
    } );
} );
