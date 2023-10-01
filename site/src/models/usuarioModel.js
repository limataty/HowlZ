var database = require("../database/config")

function cadastrarEmpresa(nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarEmpresa():", nomeEmpresa, cnpjEmpresa, emailEmpresa, senhaEmpresa);

    var instrucao = `
        INSERT INTO empresa (nome, cnpj, email, senha) VALUES ('${nomeEmpresa}', '${cnpjEmpresa}', '${emailEmpresa}', '${senhaEmpresa}');
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

module.exports = {
    cadastrarEmpresa,
    receberIDEmpresa,
    cadastrarRepresentante,
};