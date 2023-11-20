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

router.post("/validarGestor", function (req, res) {
    usuarioController.validarGestor(req, res);
});

router.post("/validarFuncionario", function (req, res) {
    usuarioController.validarFuncionario(req, res);
});

router.post("/contar", function (req, res) {
    usuarioController.contarMaquinas(req, res);
});


module.exports = router;