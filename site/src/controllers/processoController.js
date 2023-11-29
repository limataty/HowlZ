var processoModel = require("../models/processoModel");

function exibirProcesso(req, res) {
  var idMaquina = req.body.idMaquina;

  processoModel
    .exibirProcesso(idMaquina)
    .then(function (resultado) {
      console.log("resultado do Processo: " + resultado.NomeProcesso + " " + resultado.dataHora + " " + resultado.NomeComponente+ " " + resultado.uso + resultado.simbolo);
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar a validação! Erro: ",
        erro.sqlMessage
      );
      res.status(500).send(erro.sqlMessage);
    });
}

function exibirJanela(req, res) {
  var idMaquina = req.body.idMaquina;

  processoModel
    .exibirJanela(idMaquina)
    .then(function (resultado) {
      console.log("resultado: " + resultado[0].titulo + " " + resultado[0].dataHora);
      res.json(resultado[0]);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar a validação! Erro: ",
        erro.sqlMessage
      );
      res.status(500).send(erro.sqlMessage);
    });
}

function contarProcesso(req, res) {
  var idMaquina = req.body.idMaquina;

  processoModel.contarProcessoModel(idMaquina)
    .then(function (resultado) {
      console.log("resultado: " + resultado[0].TotalLinhas);
      res.json(resultado[0].TotalLinhas);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar a validação! Erro: ",
        erro.sqlMessage
      );
      res.status(500).send(erro.sqlMessage);
    });
}

function contarJanela(req, res) {
  var idMaquina = req.body.idMaquina;
  processoModel
    .contarJanela(idMaquina)
    .then(function (resultado) {
      console.log("resultado: " + resultado[0].TotalLinhas);
      res.json(resultado[0].TotalLinhas);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar a validação! Erro: ",
        erro.sqlMessage
      );
      res.status(500).send(erro.sqlMessage);
    });
}

module.exports = {
  exibirProcesso,
  exibirJanela,
  contarProcesso,
  contarJanela
};

