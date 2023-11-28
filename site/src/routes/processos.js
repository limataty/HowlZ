var express = require("express");
var router = express.Router();

var processosController = require("../controllers/processoController");

router.post("/exibirProcesso", function (req, res) {
    processosController.exibirProcesso(req, res);
})

// router.post("/exibirJanela", function (req, res) {
//     processosController.exibirJanela(req, res);
// })

router.get("/contarProcesso/:idMaquina", function (req, res) {
    processosController.contarProcesso(req, res);
})

// router.post("/contarJanela", function (req, res) {
//     processosController.contarJanela(req, res);
// })

module.exports = router;