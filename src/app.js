const express = require("express");
const cors = require("cors");
const {uuid} = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());


const repositories = [];


app.get("/repositories", (request, response) => {
  return response.send(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(newRepository);

  return response.status(201).json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const requestedId = request.params.id;
  const {title, url, techs} = request.body;

  const currentRepository = repositories.find(({id}) => id === requestedId);
  if (currentRepository === undefined) {
    return response.status(400).send();
  }

  const updatedRepository = Object.assign(currentRepository, {title, url, techs});

  return response.json(updatedRepository);
});

app.delete("/repositories/:id", (request, response) => {
  const requestedId = request.params.id;

  const currentRepositoryIndex = repositories.findIndex(({id}) => id === requestedId);
  if (currentRepositoryIndex < 0) {
    return response.status(400).send();
  }

  repositories.splice(currentRepositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const requestedId = request.params.id;

  const currentRepository = repositories.find(({id}) => id === requestedId);
  if (currentRepository === undefined) {
    return response.status(400).send();
  }

  currentRepository.likes++;

  return response.json(currentRepository);
});

module.exports = app;
