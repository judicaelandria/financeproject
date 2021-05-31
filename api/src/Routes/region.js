const { Router } = require("express");
const RegionController = require("../controller/RegionController");
const isAuth = require("../middleware/auth");

const regionController = new RegionController();
const router = Router();

router.post("/create", isAuth, regionController.create);
router.get("/fetch", isAuth, regionController.fetch);
router.put("/update/:id", isAuth, regionController.update);
router.delete("delete/:id", isAuth, regionController.delete);

module.exports = router;
