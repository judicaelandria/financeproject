const { Router } = require("express");
const infoOccupantController = require("../controller/OccupantController");
const isAuth = require("../middleware/auth");

const router = Router();
const OccupantController = new infoOccupantController();

router.post("/create", isAuth, OccupantController.create);
router.get("/fetch", isAuth, OccupantController.fetch);

module.exports = router;
