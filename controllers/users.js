<<<<<<< HEAD
import bcrypt from "bcryptjs";
import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const usersRouter = Router();

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);
=======
const bcryptjs = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcryptjs.hash(body.password, saltRounds)
>>>>>>> 50448b66f0b0f939f3577b34366b39d52d220761

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
<<<<<<< HEAD
  });

  const savedUser = await user.save();

  response.send(savedUser);
});


/*  Yritys tehdä logini tänne sisään, käytetään mieluummin login.js
usersRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const match = await bcrypt.compare(password, user.passwordHash);

  if (!match) return res.send(401);

  const token = jwt.sign(user, process.env.SECRET);
  res.send(token);
  
});
*/

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.send(users);
});

export default usersRouter;
=======
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('notes', { content: 1, date: 1 })
    
  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
>>>>>>> 50448b66f0b0f939f3577b34366b39d52d220761
