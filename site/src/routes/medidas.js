var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idCaptacao", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idCaptacao", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

router.post("/alertas", function (req, res) {
    medidaController.alertas(req, res);
});

module.exports = router;
