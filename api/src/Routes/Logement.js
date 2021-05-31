const { Router } = require("express");
const LogementController = require("../controller/logementController");
const isAuth = require("../middleware/auth");

const router = Router();
const logementController = new LogementController();

router.post("/create", isAuth, logementController.create);
router.get("/fetch", isAuth, logementController.fetch);
router.put("/:id/assign", isAuth, logementController.assign);

module.exports = router;
