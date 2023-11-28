var empresaModel = require("../models/empresaModel");

function editar(req, res) {
    var nomeFantasia = req.body.nomeFantasia;
    var razaoSocial = req.body.razaoSocial;
    var apelido = req.body.apelido;
    fkEmpresa = req.body.fkEmpresa;

  empresaModel.editar(nomeFantasia, razaoSocial, apelido, fkEmpresa)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function editarAlerts(req, res) {
    var valorAlertaMinGPU = req.body.valorAlertMinGPU;
    var valorCriticoMinGPU = req.body.valorCriticoMinGPU;
    var valorAlertaMaxGPU = valorCriticoMinGPU - 0.01;
    var valorCriticoMaxGPU = 100.00;

    var valorAlertaMinCPU = req.body.valorAlertMinCPU;
    var valorCriticoMinCPU = req.body.valorCriticoMinCPU;
    var valorAlertaMaxCPU = valorCriticoMinCPU - 0.01;
    var valorCriticoMaxCPU = 100.00;

    var valorAlertaMinRAM = req.body.valorAlertMinRAM;
    var valorCriticoMinRAM = req.body.valorCriticoMinRAM;
    var valorAlertaMaxRAM = valorCriticoMinRAM - 0.01;
    var valorCriticoMaxRAM = 100.00;

    var valorAlertaMinDISCO = req.body.valorAlertMinDisco;
    var valorCriticoMinDISCO = req.body.valorCriticoMinDisco;
    var valorAlertaMaxDISCO = valorCriticoMinDISCO - 0.01;
    var valorCriticoMaxDISCO = 100.00;

    var fkEmpresa = req.body.fkEmpresa;
    var numeroMinino = req.body.numeroMinino;
    var numeroMaximo = req.body.numeroMaximo;

    empresaModel.editarAlertas(valorAlertaMinGPU, valorCriticoMinGPU, valorAlertaMaxGPU, valorCriticoMaxGPU, valorAlertaMinCPU, valorCriticoMinCPU, valorAlertaMaxCPU, valorCriticoMaxCPU, valorAlertaMinRAM, valorCriticoMinRAM, valorAlertaMaxRAM, valorCriticoMaxRAM, valorAlertaMinDISCO, valorCriticoMinDISCO, valorAlertaMaxDISCO, valorCriticoMaxDISCO, fkEmpresa, numeroMinino, numeroMaximo)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });

}

function apagarAlertGPU(req, res){
    var fkEmpresa = req.body.fkEmpresa;
    var numeroMinino = req.body.numeroMinino;
    var numeroMaximo = req.body.numeroMaximo;

    empresaModel.apagarAlertGPU(fkEmpresa, numeroMinino, numeroMaximo)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function apagarAlertRAM(req, res){
    var fkEmpresa = req.body.fkEmpresa;
    var numeroMinino = req.body.numeroMinino;
    var numeroMaximo = req.body.numeroMaximo;

    empresaModel.apagarAlertRAM(fkEmpresa, numeroMinino, numeroMaximo)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function apagarAlertDISCO(req, res){
    var fkEmpresa = req.body.fkEmpresa;
    var numeroMinino = req.body.numeroMinino;
    var numeroMaximo = req.body.numeroMaximo;

    empresaModel.apagarAlertDISCO(fkEmpresa, numeroMinino, numeroMaximo)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function apagarAlertCPU(req, res){
    var fkEmpresa = req.body.fkEmpresa;
    var numeroMinino = req.body.numeroMinino;
    var numeroMaximo = req.body.numeroMaximo;

    empresaModel.apagarAlertCPU(fkEmpresa, numeroMinino, numeroMaximo)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}


module.exports = {
    editar,
    editarAlerts,
    apagarAlertGPU,
    apagarAlertRAM,
    apagarAlertDISCO,
    apagarAlertCPU,
  };
  