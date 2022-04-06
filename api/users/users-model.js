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

function findById(id) {
    return db('users')
        .select('id', 'username', 'logged_out_time')
        .where('id', id)
        .first()
}

function update(id, user) {
    return db("users")
      .update(user)
      .where({ id });
  }

module.exports = { findBy, insert, findAllUsers, update, findById }