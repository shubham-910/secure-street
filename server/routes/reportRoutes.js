const express = require("express");

const router = express.Router();
const {createReport, getReportByCriminalId, getReportById} = require('../controllers/reportController');

router.post("/create",createReport);
router.get("/criminal",getReportByCriminalId );
router.get("/:id", getReportById);

module.exports = router;
