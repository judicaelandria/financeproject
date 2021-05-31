const { Router } = require("express");
const FokontanyController = require("../controller/FokotanyController");
const isAuth = require("../middleware/auth");

const router = Router();
const fokontanyController = new FokontanyController();

router.post("/create", isAuth, fokontanyController.create);
router.get("/fetch", isAuth, fokontanyController.fetch);
router.put("/update/:id", isAuth, fokontanyController.update);
router.delete("/delete/:id", isAuth, fokontanyController.delete);

module.exports = router;
