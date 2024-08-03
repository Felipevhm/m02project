const { Router } = require("express");
const LocalController = require("../controllers/LocalController");
const checkUserExists = require("../middlewares/checkUserExists");

const locaisRoutes = new Router();

locaisRoutes.post("/", checkUserExists, LocalController.create);
locaisRoutes.get("/", LocalController.searchAll);
locaisRoutes.put('/:id', LocalController.update);
locaisRoutes.delete('/:id', LocalController.delete);
// locaisRoutes.get("/:id", LocalController.searchOne);

module.exports = locaisRoutes;
