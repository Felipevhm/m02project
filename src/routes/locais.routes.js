const { Router } = require("express");
const LocalController = require("../controllers/LocalController");
const checkUserExists = require("../middlewares/checkUserExists");
const authUser = require("../middlewares/authUser");

const locaisRoutes = new Router();

locaisRoutes.post("/",  authUser, LocalController.create);
locaisRoutes.get("/", authUser, LocalController.searchAll);
locaisRoutes.put("/:id", LocalController.update);
locaisRoutes.delete("/:id", LocalController.delete);
locaisRoutes.get("/:id", LocalController.searchOne);

module.exports = locaisRoutes;
