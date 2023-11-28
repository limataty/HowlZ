var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {
  const limite_linhas = 7;

  var idComputador = req.params.idCaptacao;
  var tipoComponente = req.query.tipo // Ajuste aqui para pegar o parâmetro correto

  console.log(`Recuperando as últimas ${limite_linhas} medidas`);

  medidaModel.buscarUltimasMedidas(idComputador, tipoComponente).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!");
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as últimas medidas.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarMedidasEmTempoReal(req, res) {
  var idComputador = req.params.idCaptacao;
  var tipoComponente = req.query.tipo;

  console.log(`Recuperando medidas em tempo real`);

  medidaModel.buscarMedidasEmTempoReal(idComputador, tipoComponente).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!");
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as últimas medidas.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarMedidasEmTempoRealDisparos(req, res) {
  var idComputador = req.params.idCaptacao;
  var tipoComponente = req.query.tipo // Ajuste aqui para pegar o parâmetro correto

  console.log(`Recuperando medidas em tempo real`);

  medidaModel.buscarMedidasEmTempoRealDisparos(idComputador, tipoComponente).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!");
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as últimas medidas.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function alertas(req, res) {
  var fkEmpresa = req.body.fkEmpresa;

  medidaModel.alertas(fkEmpresa)
      .then(function (resultado) {
          console.log("resultado dos !alertas!: " + resultado[0].alertaCPU + " " + resultado[0].criticoCPU + " " + resultado[0].alertaRAM + " " + resultado[0].criticoRAM + " " + resultado[0].alertaDISCO + " " + resultado[0].criticoDISCO + " " + resultado[0].alertaGPU + " " + resultado[0].criticoGPU);
          res.json(resultado[0]);
      })
      .catch(function (erro) {
          console.log(erro);
          console.log("Houve um erro ao realizar o alerta: ", erro.sqlMessage);
          res.status(500).json(erro.sqlMessage);
      });
}

function botoes(req, res){
  var idComputador = req.params.idComputador; 

  console.log(`Recuperando medidas em tempo real para os botoes`);

  medidaModel.botoes(idComputador).then(function (resultado) {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).send("Nenhum resultado encontrado!");
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao buscar as últimas medidas.", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

module.exports = {
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
  buscarMedidasEmTempoRealDisparos,
  alertas,
  botoes,

};
