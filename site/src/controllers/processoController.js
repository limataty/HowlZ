var processoModel = require("../models/processoModel");

function exibirProcesso(req, res) {
  var fkGestor = req.body.fkGestorServer;
  var idMaquina = req.body.idMaquina;

  processoModel
    .exibirProcesso(fkGestor, idMaquina)
    .then(function (resultado) {
      console.log("resultado: " + resultado[0].NomeProcesso + " " + resultado[0].dataHora + " " + resultado[0].uso + resultado[0].simbolo);
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

function exibirJanela(req, res) {
  var fkGestor = req.body.fkGestorServer;
  var idMaquina = req.body.idMaquina;

  processoModel
    .exibirJanela(fkGestor, idMaquina)
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

  processoModel
    .contarProcesso(idMaquina)
    .then(function (resultado) {
      console.log("resultado: " + resultado.TotalLinhas);
      res.json(resultado.TotalLinhas);
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

