const db = require('../../data/dbConfig')

function findAllUsers() {
    return db('users')
}

function findBy(filter) {
    return db('users')
        .where(filter)
}
async function insert(user) {
    const [id] = await db('users').insert(user)
    return findBy({ id: id })
}

module.exports = { findBy, insert, findAllUsers }