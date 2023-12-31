var usuarioModel = require("../models/usuarioModel");

function cadastrarEmpresa(
  nomeEmpresa,
  cnpjEmpresa,
  emailEmpresa,
  senhaEmpresa,
  nomeRepresentante
) {
  if (
    nomeEmpresa == "" ||
    cnpjEmpresa == "" ||
    emailEmpresa == "" ||
    senhaEmpresa == "" ||
    senhaEmpresa == ""
  ) {
    res.status(400).send("Preencha todos os campos");
  } else {
    usuarioModel
      .cadastrarEmpresa(nomeEmpresa, cnpjEmpresa, emailEmpresa)
      .then(function (resultado) {
        receberIDEmpresa(
          nomeEmpresa,
          nomeRepresentante,
          emailEmpresa,
          senhaEmpresa
        );
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

function validarCadastro(req, res) {
  var nomeEmpresa = req.body.nomeEmpresa;
  var nomeRepresentante = req.body.nomeContratante;
  var cnpjEmpresa = req.body.cnpjEmpresa;
  var emailEmpresa = req.body.emailEmpresa;
  var senhaEmpresa = req.body.senhaEmpresa;

  if (nomeEmpresa == "" || cnpjEmpresa == "" || emailEmpresa == "") {
    res.status(400).send("Preencha todos os campos");
  } else if (cnpjEmpresa.length != 18) {
    res.status(400).send("CNPJ inválido!");
  } else if (
    emailEmpresa.indexOf("@") == -1 ||
    emailEmpresa.indexOf(".") == -1
  ) {
    res.status(400).send("Email inválido, é necessário possuir @ e .");
  } else {
    usuarioModel
      .validarCadastro(nomeEmpresa, cnpjEmpresa, emailEmpresa)
      .then(function (resultado) {
        console.log("resultado: " + resultado[0].existe_empresa);

        if (resultado[0].existe_empresa == 0) {
          cadastrarEmpresa(
            nomeEmpresa,
            cnpjEmpresa,
            emailEmpresa,
            senhaEmpresa,
            nomeRepresentante
          );
          res.status(201).send("Cadastrado com sucesso!");
        } else {
          console.log("empresa existe");
          res.status(203).send("Empresa já existente!");
        }
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
}

function receberIDEmpresa(
  nomeEmpresa,
  nomeRepresentante,
  emailEmpresa,
  senhaEmpresa
) {
  usuarioModel
    .receberIDEmpresa(nomeEmpresa)
    .then(function (resultado) {
      var idEmpresa = resultado[0].idEmpresa;
      console.log("idEmpresa: " + resultado[0].idEmpresa);
      cadastrarRepresentante(
        nomeRepresentante,
        idEmpresa,
        emailEmpresa,
        senhaEmpresa
      );
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
    });
}

function cadastrarRepresentante(
  nomeRepresentante,
  idEmpresa,
  emailEmpresa,
  senhaEmpresa
) {
  usuarioModel
    .cadastrarRepresentante(
      nomeRepresentante,
      idEmpresa,
      emailEmpresa,
      senhaEmpresa
    )
    .then(function (resultado) {})
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
    usuarioModel
      .entrar(email, senha)
      .then(function (resultado) {
        console.log(`\nResultados encontrados: ${resultado.length}`);
        console.log(`Resultados: ${JSON.stringify(resultado)}`);

        if (resultado.length == 1) {
          console.log(resultado);
          res.json(resultado[0]);
          console.log(resultado[0]);
        } else if (resultado.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrarGestor(nomeGestor, emailGestor, senhaGestor, fkEmpresa) {

  if (nomeGestor == "" || emailGestor == "" || senhaGestor == "") {
    res.status(400).send("Preencha todos os campos");
  } else if (emailGestor.indexOf("@") == -1 || emailGestor.indexOf(".") == -1) {
    res.status(400).send("Email inválido, é necessário possuir @ e .");
  } else if (senhaGestor.length < 8) {
    res
      .status(400)
      .send("Senha inválida, é necessário possuir 8 ou mais caracteres");
  } else {
    usuarioModel
      .cadastrarGestor(nomeGestor, emailGestor, senhaGestor, fkEmpresa)
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
}

function validarGestor(req, res) {
  var nomeGestor = req.body.nomeGestor;
  var emailGestor = req.body.emailGestor;
  var senhaGestor = req.body.senhaGestor;
  var fkEmpresa = req.body.fkEmpresa;

  if (nomeGestor == "" || emailGestor == "" || senhaGestor == "") {
    res.status(400).send("Preencha todos os campos");
  } else if (emailGestor.indexOf("@") == -1 || emailGestor.indexOf(".") == -1) {
    res.status(400).send("Email inválido, é necessário possuir @ e .");
  } else if (senhaGestor.length < 8) {
    res
      .status(400)
      .send("Senha inválida, é necessário possuir 8 ou mais caracteres");
  } else {

  usuarioModel
    .validarGestor(nomeGestor, emailGestor)
    .then(function (resultado) {
      console.log("resultado: " + resultado[0].existe_gestor);

      if (resultado[0].existe_gestor == 0) {
        res.status(201).send("Cadastrado com sucesso!");
        cadastrarGestor(nomeGestor, emailGestor, senhaGestor, fkEmpresa);
      } else {
        console.log("gestor existe");
        res.status(203).send("Gestor já existente!");
      }
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
}

function cadastrarFuncionario(nomeFuncionario, emailFuncionario, senhaFuncionario, fkEmpresa, fkGestor) {

  if (nomeFuncionario == "" || emailFuncionario == "" || senhaFuncionario == "") {
    res.status(400).send("Preencha todos os campos");
  } else if (emailFuncionario.indexOf("@") == -1 || emailFuncionario.indexOf(".") == -1) {
    res.status(400).send("Email inválido, é necessário possuir @ e .");
  } else if (senhaFuncionario.length < 8) {
    res
      .status(400)
      .send("Senha inválida, é necessário possuir 8 ou mais caracteres");
  } else {
    usuarioModel
      .cadastrarFuncionario(nomeFuncionario, emailFuncionario, senhaFuncionario, fkEmpresa, fkGestor)
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
}

function validarFuncionario(req, res) {
  var nomeFuncionario = req.body.nomeFuncionario;
  var emailFuncionario = req.body.emailFuncionario;
  var senhaFuncionario = req.body.senhaFuncionario;
  var fkEmpresa = req.body.fkEmpresa;
  var fkGestor = req.body.fkGestor;

  if (nomeFuncionario == "" || emailFuncionario == "" || senhaFuncionario == "") {
    res.status(400).send("Preencha todos os campos");
  } else if (emailFuncionario.indexOf("@") == -1 || emailFuncionario.indexOf(".") == -1) {
    res.status(400).send("Email inválido, é necessário possuir @ e .");
  } else if (senhaFuncionario.length < 8) {
    res
      .status(400)
      .send("Senha inválida, é necessário possuir 8 ou mais caracteres");
  } else {

  usuarioModel
    .validarFuncionario(nomeFuncionario, emailFuncionario)
    .then(function (resultado) {
      console.log("resultado: " + resultado[0].existe_Funcionario);

      if (resultado[0].existe_funcionario == 0) {
        res.status(201).send("Cadastrado com sucesso!");
        cadastrarFuncionario(nomeFuncionario, emailFuncionario, senhaFuncionario, fkEmpresa, fkGestor);
      } else {
        console.log("Funcionario existe");
        res.status(203).send("Funcionario já existente!");
      }
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
}

function contarMaquinas(req, res){ 
  var fkGestor = req.body.fkGestorServer; 

  usuarioModel
    .contarMaquinas(fkGestor)
    .then(function (resultado) {
      console.log("quantidade maquinas: " + resultado[0].maquinas);
      res.json(resultado[0].maquinas);
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

function maquinas(req, res){ 
  var idMaquina = req.body.fkMaquina; 

  usuarioModel
    .maquinas(idMaquina)
    .then(function (resultado) {
      console.log("resultado das maquinas: " + resultado[0].UsoCPU + " " + resultado[0].Memoria + " " + resultado[0].Disco);
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

function idMaquina(req, res){ 
  var fkGestor = req.body.fkGestorServer; 
  var contagem = req.body.contagem;

  usuarioModel
    .idMaquina(fkGestor)
    .then(function (resultado) {
      console.log("idComputador: " + resultado[contagem].idComputador);
      res.status(200).json(resultado[contagem].idComputador);
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

function listar(req, res) {
  var fkGestor = req.params.fkGestorServer;

    usuarioModel.listar(fkGestor).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function editar(req, res) {
  var novoNome = req.body.nome;
  var novoEmail = req.body.email;
  var novaSenha = req.body.senha;
  var nomeAntigo = req.body.nomeAntigo;
  var emailAntigo = req.body.emailAntigo;
  var idUsuario = req.body.idUsuario;

  usuarioModel.editar(novoNome, novoEmail, novaSenha, nomeAntigo, emailAntigo, idUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function apagar(req, res) {
  var idUsuario = req.body.idUsuario;

  usuarioModel.apagar(idUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function editarGestor(req, res){
  var novoNome = req.body.nome;
  var novoEmail = req.body.email;
  var novaSenha = req.body.senha;
  var nomeAntigo = req.body.nomeAntigo;
  var emailAntigo = req.body.emailAntigo;
  var idUsuario = req.body.idUsuario;

  usuarioModel.editarGestor(novoNome, novoEmail, novaSenha, nomeAntigo, emailAntigo, idUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function apagarGestor(req, res) {
  var idUsuario = req.body.idUsuario;

  usuarioModel.apagarGestor(idUsuario)
    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function alertas(req, res){
  var fkEmpresa = req.body.fkEmpresa;

  usuarioModel.alertas(fkEmpresa)
    .then(function (resultado) {
      console.log("resultado dos alertas: " + resultado[0].criticoCPU + " " + resultado[0].criticoMemoria + " " + resultado[0].criticoDisco + " " + resultado[0].avisoCPU + " " + resultado[0].avisoMemoria + " " + resultado[0].avisoDisco);
      res.json(resultado[0]);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao realizar o alerta: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrarEmpresa,
  entrar,
  validarCadastro,
  cadastrarGestor,
  cadastrarFuncionario,
  validarGestor,
  validarFuncionario,
  contarMaquinas,
  maquinas,
  idMaquina,
  listar,
  editar,
  apagar,
  editarGestor,
  apagarGestor,
  alertas,
};
