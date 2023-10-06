var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrarEmpresa", function (req, res) {
    // const dados = req.body
    usuarioController.cadastrarEmpresa(req, res);
})

router.post("/validarCadastro", function (req, res) {
    usuarioController.validarCadastro(req, res);
});


router.post("/logar", function (req, res) {
    usuarioController.entrar(req, res);
});


module.exports = router;