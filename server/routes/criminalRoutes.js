const express = require("express");

const router = express.Router();
const {createCriminal, getCriminalByObjKey, getCriminalById} = require('../controllers/criminalController');

router.post("/create",createCriminal);
router.get("/objkey", getCriminalByObjKey);
router.get("/:id", getCriminalById);

module.exports = router;
