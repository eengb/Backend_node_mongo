import { Router } from "express";
import Sight from "../models/sight.js";

const sightsRouter = Router();

/** Matkakohteen CRUD operaatiot */
sightsRouter.get("/", async (request, response) => {
  const sights = await Sight.find({});
  return response.json(sights);
});

sightsRouter.post("/", async (request, response) => {
  const body = request.body;

  if (body.destination === undefined) {
    return response.status(400).json({ error: "destination missing" });
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

  const sight = new Sight({
    destination: body.destination,
    country: body.country,
    city: body.city,
    description: body.description,
    picture: body.picture,
  });

  const savedSight = await sight.save();
  response.json(savedSight);
});

export default sightsRouter;
