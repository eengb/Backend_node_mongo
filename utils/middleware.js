import jwt from "jsonwebtoken";

export const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

export const tokenExtractor = (request, response, next) => {
  if (!request.headers.authorization){
    next();
  }
  const token = request.headers.authorization.split(" ").pop()
  request.userId = jwt.verify(token, process.env.SECRET).id;
  next();
};