const e = require("express");
var database = require("../database/config")

function cadastrarEmpresa(nomeEmpresa, cnpjEmpresa, emailEmpresa) {
    var instrucao = `
        INSERT INTO empresa (nome, cnpj, email) VALUES ('${nomeEmpresa}', '${cnpjEmpresa}', '${emailEmpresa}');
    `;
    return database.executar(instrucao);
}

function validarCadastro(nomeEmpresa, cnpjEmpresa, emailEmpresa) {
    var instrucao = `
        SELECT CASE WHEN EXISTS (
            SELECT 1
            FROM empresa
            WHERE nome = '${nomeEmpresa}' AND cnpj = '${cnpjEmpresa}' AND email = '${emailEmpresa}'
        ) THEN 1 ELSE 0 END AS existe_empresa;
    `;
    return database.executar(instrucao);
}

function receberIDEmpresa(nomeEmpresa) {
    var instrucao = `
        SELECT idEmpresa
        FROM empresa
        WHERE nome = '${nomeEmpresa}';
    `;
    return database.executar(instrucao);
}

function cadastrarRepresentante(nomeRepresentante, empresaID, emailEmpresa, senhaEmpresa) {
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, tipo, fkEmpresa) VALUES ('${nomeRepresentante}', '${emailEmpresa}', '${senhaEmpresa}', 'Representante', ${empresaID});
    `;
    return database.executar(instrucao);
}

function entrar(email, senha) {
    var instrucao = `
        SELECT usuario.*, empresa.email, empresa.cnpj, empresa.nome AS nomeEmpresa
        FROM usuario
        LEFT JOIN empresa ON empresa.IdEmpresa = usuario.fkEmpresa
        WHERE usuario.email = '${email}' AND usuario.senha = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrarGestor(nomeGestor, emailGestor, senhaGestor, fkEmpresa) {
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, tipo, fkEmpresa) VALUES ('${nomeGestor}', '${emailGestor}', '${senhaGestor}', 'Gestor', ${fkEmpresa});
    `;
    return database.executar(instrucao);
}

function cadastrarFuncionario(nomeFuncionario, emailFuncionario, senhaFuncionario, fkEmpresa) {
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, tipo, fkEmpresa) VALUES ('${nomeFuncionario}', '${emailFuncionario}', '${senhaFuncionario}', 'Funcionario', ${fkEmpresa});
    `;
    return database.executar(instrucao);
}

function validarGestor(nomeGestor, emailGestor) {
    var instrucao = `
        SELECT CASE WHEN EXISTS (
            SELECT 1
            FROM usuario
            WHERE nome = '${nomeGestor}' AND email = '${emailGestor}' AND tipo = 'Gestor'
        ) THEN 1 ELSE 0 END AS existe_gestor;
    `;
    return database.executar(instrucao);
}

function validarFuncionario(nomeFuncionario, emailFuncionario) {
    var instrucao = `
        SELECT CASE WHEN EXISTS (
            SELECT 1
            FROM usuario
            WHERE nome = '${nomeFuncionario}' AND email = '${emailFuncionario}' AND tipo = 'Funcionario'
        ) THEN 1 ELSE 0 END AS existe_funcionario;
    `;
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