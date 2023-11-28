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

router.post("/maquinas", function (req, res) {
    usuarioController.maquinas(req, res);
});

router.post("/idMaquina", function (req, res) {
    usuarioController.idMaquina(req, res);
});

router.post("/alertas", function (req, res) {
    usuarioController.alertas(req, res);
});

router.get("/listar/:fkGestorServer", function (req, res) {
    usuarioController.listar(req, res);
});

router.post("/editar", function (req, res) {
    usuarioController.editar(req, res);
});

router.post("/apagar", function (req, res) {
    usuarioController.apagar(req, res);
});

router.post("/editarGestor", function (req, res) {
    usuarioController.editarGestor(req, res);
});

router.post("/apagarGestor", function (req, res) {
    usuarioController.apagar(req, res);
});

module.exports = router;