const { Router } = require("express");

const ProprietaireController = require("../controller/proprietaireController");

const proprietaireController = new ProprietaireController();
const router = Router();

router.post("/create", proprietaireController.create);
router.get("/fetch", proprietaireController.fetch);
router.put("/update/:id", proprietaireController.update);
router.delete("/delete/:id", proprietaireController.delete);

module.exports = router;
