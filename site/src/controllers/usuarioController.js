var usuarioModel = require("../models/usuarioModel");

function cadastrarEmpresa(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var nomeEmpresa = req.body.nomeEmpresa;
  var nomeRepresentante = req.body.nomeContratante;
  var cnpjEmpresa = req.body.cnpjEmpresa;
  var emailEmpresa = req.body.emailEmpresa;
  var senhaEmpresa = req.body.senhaEmpresa;

  // Faça as validações dos valores
  if (
    nomeEmpresa == "" ||
    cnpjEmpresa == "" ||
    emailEmpresa == "" ||
    senhaEmpresa == "" ||
    senhaEmpresa == ""
  ) {
    res.status(400).send("Preencha todos os campos");
  } else if (cnpjEmpresa.length != 18) {
    res.status(400).send("CNPJ inválido!");
  } else if (
    emailEmpresa.indexOf("@") == -1 ||
    emailEmpresa.indexOf(".") == -1
  ) {
    res.status(400).send("Email inválido, é necessário possuir @ e .");
  } else if (senhaEmpresa.length < 8) {
    res
      .status(400)
      .send("Senha inválida, é necessário possuir 8 ou mais caracteres");
  } else {
    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
    usuarioModel
      .cadastrarEmpresa(
        nomeEmpresa,
        cnpjEmpresa,
        emailEmpresa,
        senhaEmpresa
      )
      .then(function (resultado) {
        res.json(resultado);
        receberIDEmpresa(nomeEmpresa, nomeRepresentante);
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });

  }
}

function receberIDEmpresa(nomeEmpresa, nomeRepresentante) {
    usuarioModel
    .receberIDEmpresa(nomeEmpresa)
    .then(function (resultado) {
        var idEmpresa = resultado[0].idEmpresa;
        console.log("idEmpresa: " + resultado[0].idEmpresa);
        cadastrarRepresentante(nomeRepresentante, idEmpresa);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
    });
}

function cadastrarRepresentante(nomeRepresentante, idEmpresa) {
    usuarioModel
      .cadastrarRepresentante(nomeRepresentante, idEmpresa)
      .then(function (resultado) {
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o cadastro! Erro: ",
          erro.sqlMessage
        );
      });
}

module.exports = {
  cadastrarEmpresa,
};
