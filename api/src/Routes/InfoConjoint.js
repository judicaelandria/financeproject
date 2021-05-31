const { Router } = require("express");
const InfoConjointController = require("../controller/InformationConjointController");

const router = Router();
const ConjointController = new InfoConjointController();

router.post("/create", ConjointController.create);
router.get("/fetch", ConjointController.fetch);

module.exports = router;
