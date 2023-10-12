const e = require("express");
var database = require("../database/config")

function cadastrarEmpresa(nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa);

    var instrucao = `
        INSERT INTO empresa (nome, cnpj, email, senha) VALUES ('${nomeEmpresa}', '${cnpjEmpresa}', '${emailEmpresa}', '${senhaEmpresa}');
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

function cadastrarRepresentante(nomeRepresentante, empresaID) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeRepresentante, empresaID);

    var instrucao = `
        INSERT INTO representante (nome, empresaID) VALUES ('${nomeRepresentante}', ${empresaID});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
    SELECT representante.*,  empresa.email, empresa.cnpj, empresa.nome AS nomeEmpresa
    FROM representante
    LEFT JOIN empresa ON empresa.IdEmpresa = representante.empresaID
    WHERE empresa.email = '${email}' AND empresa.senha = '${senha}';
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
};