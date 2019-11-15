const db = require("../data/dbConfig");

module.exports = {
  insert,
  remove,
  getAll

}


function getAll() {
  return db('users');
}

function insert(user) {
  return (
    db('users')
      .insert(user, "id")
      .then(ids => {
        const id = ids[0];
        return db('users')
          .where({ id })
          .first();
      })
  )

}

function remove(id) {
  return (
    db('users')
      .where({ id })
      .del()

  )
}