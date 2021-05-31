const { Router } = require("express");
const isAuth = require("../middleware/auth");

const CommuneController = require("../controller/CommuneController");

const communeController = new CommuneController();
const router = Router();

router.post("/create", isAuth, communeController.create);
router.get("/fetch", isAuth, communeController.fetch);
router.put("/update/:id", isAuth, communeController.update);
router.delete("/delete/:id", isAuth, communeController.delete);

module.exports = router;
