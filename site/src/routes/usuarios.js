var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrarEmpresa", function (req, res) {
    // const dados = req.body
    usuarioController.cadastrarEmpresa(req, res);
})

module.exports = router;