import { Router } from "express";
import Sight from "../models/sight.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import {addSight} from "../services/Sights.js"

const sightsRouter = Router();

/** Matkakohteen CRUD operaatiot */
sightsRouter.get("/", async (request, response) => {
  const sights = await Sight.find({}).populate("user") //asd?
  return response.json(sights);
});

sightsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (body.destination === undefined) {
    return response.status(400).json({ error: "destination missing 1" });
  }
  if (body.country === undefined) {
    return response.status(400).json({ error: "country missing" });
  }
  if (body.description === undefined) {
    return response.status(400).json({ error: "description missing" });
  }
  if (body.picture === undefined) {
    return response.status(400).json({ error: "picture missing" });
  }

  const token = request.headers.authorization.split(" ").pop()
  const id = jwt.verify(token, process.env.SECRET);

  //const res = await addSight(request.body, id.id)

  const sight = new Sight({
    destination: body.destination,
    country: body.country,
    city: body.city,
    description: body.description,
    picture: body.picture, 
    user: id.id
  });

  const savedSight = await sight.save();
  //const user = await User.findById(id.id)
  //user.sights = user.sights.concat(savedSight.id)
  await User.findOneAndUpdate({email:id.email},{$push:{sights:savedSight.id}})
  
  
  response.json(savedSight);
});

export default sightsRouter;
