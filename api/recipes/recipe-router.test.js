const db = require('../../data/dbConfig')
const router = require('./recipe-router')
const request = require('supertest')

const Recipes = require('./recipes-model')

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});
beforeEach(async () => {
    await db('recipes').truncate();
});
beforeEach(async () => {
    await db('ingredients').truncate();
});
beforeEach(async () => {
    await db('steps').truncate();
});
afterAll(async () => {
    await db.destroy();
});

test('sanity check', () => {
    expect(1).toBe(1);
});