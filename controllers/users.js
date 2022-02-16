import bcrypt from "bcryptjs";
import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const usersRouter = Router();

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    email: body.email,
    username: body.username,
    firstname: body.firstname,
    surname: body.surname,
    imageUrl: body.imageUrl,
    passwordHash,
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
