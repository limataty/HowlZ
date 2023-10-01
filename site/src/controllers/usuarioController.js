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

function entrar(req, res) {

  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
      res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
      res.status(400).send("Sua senha está indefinida!");
  } else {

      usuarioModel.entrar(email, senha)
          .then(
              function (resultado) {
                  console.log(`\nResultados encontrados: ${resultado.length}`);
                  console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                  if (resultado.length == 1) {
                      console.log(resultado);
                      res.json(resultado[0]);
                      console.log(resultado[0])
                  } else if (resultado.length == 0) {
                      res.status(403).send("Email e/ou senha inválido(s)");
                  } else {
                      res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                  }
              }
          ).catch(
              function (erro) {
                  console.log(erro);
                  console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                  res.status(500).json(erro.sqlMessage);
              }
          );
  }

}

module.exports = {
  cadastrarEmpresa,
  entrar,
};
