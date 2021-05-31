const RegisterController = require("../controller/RegisterController");
const { Router } = require("express");

const registerController = new RegisterController();
const router = Router();

router.post("/create", registerController.create);

module.exports = router;
