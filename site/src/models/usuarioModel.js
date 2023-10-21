const e = require("express");
var database = require("../database/config")

function cadastrarEmpresa(nomeEmpresa, cnpjEmpresa, emailEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeEmpresa, cnpjEmpresa, emailEmpresa);

    var instrucao = `
        INSERT INTO empresa (nome, cnpj, email) VALUES ('${nomeEmpresa}', '${cnpjEmpresa}', '${emailEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function validarCadastro(nomeEmpresa, cnpjEmpresa, emailEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeEmpresa, cnpjEmpresa, emailEmpresa);

    var instrucao = `
    SELECT EXISTS (
        SELECT 1
        FROM empresa
        WHERE nome = '${nomeEmpresa}' AND cnpj = '${cnpjEmpresa}' AND email = '${emailEmpresa}'
    ) AS existe_empresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function receberIDEmpresa(nomeEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeEmpresa);

    var instrucao = `
    SELECT idEmpresa
    FROM empresa
    WHERE nome = '${nomeEmpresa}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarRepresentante(nomeRepresentante, empresaID, emailEmpresa, senhaEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeRepresentante, empresaID, emailEmpresa, senhaEmpresa);

    var instrucao = `
        INSERT INTO usuario (nome, email, senha, tipo, fkEmpresa) VALUES ('${nomeRepresentante}', '${emailEmpresa}', '${senhaEmpresa}', 'Representante', ${empresaID});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT usuario.*,  empresa.email, empresa.cnpj, empresa.nome AS nomeEmpresa
    FROM usuario
    LEFT JOIN empresa ON empresa.IdEmpresa = usuario.fkEmpresa
    WHERE usuario.email = '${email}' AND usuario.senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarGestor(nomeGestor, emailGestor, senhaGestor, fkEmpresa){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeGestor, emailGestor, senhaGestor, fkEmpresa);

    var instrucao = `
        INSERT INTO usuario (nome, email, senha, tipo, fkEmpresa) VALUES ('${nomeGestor}', '${emailGestor}', '${senhaGestor}', 'Gestor', ${fkEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarFuncionario(nomeFuncionario, emailFuncionario, senhaFuncionario, fkEmpresa){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeFuncionario, emailFuncionario, senhaFuncionario, fkEmpresa);

    var instrucao = `
        INSERT INTO usuario (nome, email, senha, tipo, fkEmpresa) VALUES ('${nomeFuncionario}', '${emailFuncionario}', '${senhaFuncionario}', 'Funcionario', ${fkEmpresa});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function validarGestor(nomeGestor, emailGestor) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeGestor, emailGestor);

    var instrucao = `
    SELECT EXISTS (
        SELECT 1
        FROM usuario
        WHERE nome = '${nomeGestor}' AND email = '${emailGestor}' AND tipo = 'Gestor'
    ) AS existe_gestor;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function validarFuncionario(nomeFuncionario, emailFuncionario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeFuncionario, emailFuncionario);

    var instrucao = `
    SELECT EXISTS (
        SELECT 1
        FROM usuario
        WHERE nome = '${nomeFuncionario}' AND email = '${emailFuncionario}' AND tipo = 'Funcionario'
    ) AS existe_funcionario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
module.exports = {
    cadastrarEmpresa,
    receberIDEmpresa,
    cadastrarRepresentante,
    entrar,
    validarCadastro,
    cadastrarGestor,
    cadastrarFuncionario,
    validarGestor,
    validarFuncionario,
};