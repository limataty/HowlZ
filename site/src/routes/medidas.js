var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idCaptacao/:tipo", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idCaptacao/:tipo", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
});

router.post("/alertas", function (req, res) {
    medidaController.alertas(req, res);
});

router.get("/botoes/:idComputador", function (req, res) {
    medidaController.botoes(req, res);
});


module.exports = router;
