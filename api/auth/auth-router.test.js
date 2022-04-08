const db = require('../../data/dbConfig');
const router = require('./auth-router');
const request = require('supertest');

const Users = require('../users/users-model');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});
beforeEach(async () => {
    await db('users').truncate();
});
afterAll(async () => {
    await db.destroy();
});

test('sanity check', () => {
    expect(1).toBe(1);
});
