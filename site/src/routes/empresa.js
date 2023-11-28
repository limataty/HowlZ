var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");

router.post("/editar", function (req, res) {
    empresaController.editar(req, res);
});

router.post("/editarAlerts", function (req, res) {
    empresaController.editarAlerts(req, res);
});

// delete

router.post("/apagarAlertGPU", function (req, res) {
    empresaController.apagarAlertGPU(req, res);
});

router.post("/apagarAlertRAM", function (req, res) {
    empresaController.apagarAlertRAM(req, res);
});

router.post("/apagarAlertCPU", function (req, res) {
    empresaController.apagarAlertCPU(req, res);
});

router.post("/apagarAlertDISCO", function (req, res) {
    empresaController.apagarAlertDISCO(req, res);
});

module.exports = router;
