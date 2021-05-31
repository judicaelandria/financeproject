const { Router } = require("express");
const AuthController = require("../controller/authController");
const auth = require("../middleware/auth");

const authController = new AuthController();
const router = Router();

router.post("/signIn", authController.login);
router.get("/me", auth, authController.fetch);
router.get("/users-Invitation", authController.UsersInvitation);

module.exports = router;
