const { Router } = require("express");
const UsersController = require("../controller/usersController");
const { User } = require("../models/User");
const isAuth = require("../middleware/auth");

const userController = new UsersController();
const router = Router();

router.post("/create", userController.create);
router.put("/:id/authorize", isAuth, userController.authorize);
router.get("/inactive", isAuth, userController.inactiveusers);
router.get("/active", isAuth, userController.activeusers);
router.get("/:id", isAuth, userController.user);
// router.get("/fetch", userController.fetch);

module.exports = router;
