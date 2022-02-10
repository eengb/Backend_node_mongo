import express from "express";
import sightsRouter from "./controllers/sights.js";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import { unknownEndpoint } from "./utils/middleware.js";
import { connectToDb } from "./db.js";
import cors from "cors";

<<<<<<< HEAD
const app = express();
app.use(cors());
app.use(express.json());
=======
//FullstackOpen tyylillä
const usersRouter= require('./controllers/users')

const middleware = require('./utils/middleware')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
>>>>>>> 50448b66f0b0f939f3577b34366b39d52d220761

await connectToDb();

app.use("/mo", (req, res) => res.send("boi")); //testi
app.use("/api/sights", sightsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(unknownEndpoint);

<<<<<<< HEAD
export default app;
=======
app.use(cors())
app.use(express.json())

app.use('/api/sights',sightsRouter)
app.use('/api/users', usersRouter)


app.use(middleware.unknownEndpoint)


module.exports = app
>>>>>>> 50448b66f0b0f939f3577b34366b39d52d220761
