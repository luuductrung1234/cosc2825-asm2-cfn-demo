const express = require("express");

const errorController = require("../app/controllers/errorController");

const errorRoutes = express.Router();

errorRoutes.get("/403", errorController.get403);
errorRoutes.get("/400", errorController.get400);
errorRoutes.get("/500", errorController.get500);
errorRoutes.use(errorController.get404);

module.exports = errorRoutes;
