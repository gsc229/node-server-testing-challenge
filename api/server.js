const express = require("express");


const server = express();

const Users = require('../users/usersModel');

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up", environment: process.env.DB_ENV });
});

server.get("/users", (req, res) => {
  Users.getAll()
    .then(users => {
      console.log(typeof users)
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


server.post('/users', (req, res) => {
  const userInfo = req.body;
  Users.insert(userInfo)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      res.status(500).json(error);
    });
})

server.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(info => {
      res.json(info);
    })
})

module.exports = server;