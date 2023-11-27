const e = require("express");
var database = require("../database/config");
const { escape } = require("mysql2");

function cadastrarEmpresa(nomeEmpresa, cnpjEmpresa, emailEmpresa) {
    var instrucao = `
        INSERT INTO empresa (nomeFantasia, cnpj) VALUES ('${nomeEmpresa}', '${cnpjEmpresa}');
    `;
    return database.executar(instrucao);
}

function validarCadastro(nomeEmpresa, cnpjEmpresa, emailEmpresa) {
    var instrucao = `
        SELECT CASE WHEN EXISTS (
            SELECT 1
            FROM empresa
            WHERE nomeFantasia = '${nomeEmpresa}' AND cnpj = '${cnpjEmpresa}'
        ) THEN 1 ELSE 0 END AS existe_empresa;
    `;
    return database.executar(instrucao);
}

function receberIDEmpresa(nomeEmpresa) {
    var instrucao = `
        SELECT idEmpresa
        FROM empresa
        WHERE nomeFantasia = '${nomeEmpresa}';
    `;
    return database.executar(instrucao);
}

function cadastrarRepresentante(nomeRepresentante, empresaID, emailEmpresa, senhaEmpresa) {
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, fkEmpresa, fkTipoUsuario) VALUES ('${nomeRepresentante}', '${emailEmpresa}', '${senhaEmpresa}', ${empresaID}, 3);
    `;
    return database.executar(instrucao);
}

function entrar(email, senha) {
    var instrucao = `
        SELECT usuario.*, empresa.cnpj, empresa.nomeFantasia AS nomeEmpresa
        FROM usuario
        LEFT JOIN empresa ON empresa.IdEmpresa = usuario.fkEmpresa
        WHERE usuario.email = '${email}' AND usuario.senha = '${senha}';
    `;
    return database.executar(instrucao);
}

function cadastrarGestor(nomeGestor, emailGestor, senhaGestor, fkEmpresa) {
    var instrucao = `
    INSERT INTO usuario (nome, email, senha, fkEmpresa, fkTipoUsuario) VALUES ('${nomeGestor}', '${emailGestor}', '${senhaGestor}', ${fkEmpresa}, 1);
    `;
    return database.executar(instrucao);
}

function cadastrarFuncionario(nomeFuncionario, emailFuncionario, senhaFuncionario, fkEmpresa, fkGestor) {
    var instrucao = `
    INSERT INTO usuario (nome, email, senha, fkEmpresa, fkTipoUsuario, fkGestor) VALUES ('${nomeFuncionario}', '${emailFuncionario}', '${senhaFuncionario}', ${fkEmpresa}, 2, ${fkGestor});
    `;
    return database.executar(instrucao);
}

function validarGestor(nomeGestor, emailGestor) {
    var instrucao = `
        SELECT CASE WHEN EXISTS (
            SELECT 1
            FROM usuario
            WHERE nome = '${nomeGestor}' AND email = '${emailGestor}' AND fkTipoUsuario = 1
        ) THEN 1 ELSE 0 END AS existe_gestor;
    `;
    return database.executar(instrucao);
}

function validarFuncionario(nomeFuncionario, emailFuncionario) {
    var instrucao = `
        SELECT CASE WHEN EXISTS (
            SELECT 1
            FROM usuario
            WHERE nome = '${nomeFuncionario}' AND email = '${emailFuncionario}' AND fkTipoUsuario = 2
        ) THEN 1 ELSE 0 END AS existe_funcionario;
    `;
    return database.executar(instrucao);
}

function contarMaquinas(fkGestor) {
    var instrucao = `
    SELECT COUNT(*) as maquinas
    FROM Usuario
    JOIN AssociacaoComputadorUsuario ON Usuario.idUsuario = fkUsuario
    WHERE Usuario.fkGestor = ${fkGestor};
    `;
    return database.executar(instrucao);

}

function maquinas(idMaquina) {
    instrucao = "";
    if(process.env.AMBIENTE_PROCESSO == "producao"){
        instrucao = `
        SELECT 
    FORMAT(Monitoramento.dataHora, 'HH:mm:ss') AS momento_grafico, 
    Componente.fkComputador AS idComputador,
    MAX(CASE WHEN Monitoramento.tipo = 'PORCENTAGEMUSO' THEN Monitoramento.valor END) AS UsoCPU,
    MAX(CASE WHEN Monitoramento.tipo = 'GBUSO' THEN Monitoramento.valor END) AS Memoria,
    MAX(CASE WHEN Monitoramento.tipo = 'GBTOTAL' THEN Monitoramento.valor END) AS Disco
    FROM 
        Componente
    JOIN 
        Monitoramento ON Componente.idComponente = Monitoramento.fkComponente
    WHERE 
        Componente.fkComputador = ?
    GROUP BY 
        FORMAT(Monitoramento.dataHora, 'HH:mm:ss'), Componente.fkComputador
    ORDER BY 
        FORMAT(Monitoramento.dataHora, 'HH:mm:ss') DESC
    OFFSET 0 ROWS FETCH NEXT 1 ROW ONLY;
        `;
    }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
    instrucao = `
    SELECT 
    DATE_FORMAT(Monitoramento.dataHora, '%H:%i:%s') AS momento_grafico, 
    Componente.fkComputador AS idComputador,
    MAX(CASE WHEN Monitoramento.tipo = 'PORCENTAGEMUSO' THEN Monitoramento.valor END) AS UsoCPU,
    MAX(CASE WHEN Monitoramento.tipo = 'GBUSO' THEN Monitoramento.valor END) AS Memoria,
    MAX(CASE WHEN Monitoramento.tipo = 'GBTOTAL' THEN Monitoramento.valor END) AS Disco
    FROM 
        Componente
    JOIN 
        Monitoramento ON Componente.idComponente = Monitoramento.fkComponente
    WHERE 
        Componente.fkComputador = ${idMaquina} 
    GROUP BY 
        momento_grafico, idComputador
    ORDER BY 
        momento_grafico DESC
    LIMIT 1;
    `;
    }
    return database.executar(instrucao);

}

function idMaquina(fkGestor) {
    var instrucao = `
    SELECT 
    Computador.idComputador
    FROM 
        Usuario
    JOIN 
        AssociacaoComputadorUsuario ON Usuario.idUsuario = fkUsuario
	JOIN 
		Computador ON fkComputador = idComputador
    WHERE 
        Usuario.fkGestor = ${fkGestor};
    `;
    return database.executar(instrucao);
}

function listar(fkGestor){
    var instrucao = `SELECT Usuario.nome,
	Usuario.email
    FROM Usuario
    WHERE fkGestor = ${fkGestor};`;

    return database.executar(instrucao);
}

function listar(fkGestor){
    var instrucao = `SELECT Usuario.nome,
	Usuario.email,
    Usuario.idUsuario
    FROM Usuario
    WHERE fkGestor = ${fkGestor};`;

    return database.executar(instrucao);
}

function editar(novoNome, novoEmail, novaSenha, nomeAntigo, emailAntigo, idUsuario) {
    var instrucao = `
    UPDATE Usuario 
	SET nome = '${novoNome}', email = '${novoEmail}', senha = '${novaSenha}'
    WHERE idUsuario = ${idUsuario} and email = '${emailAntigo}' and nome = '${nomeAntigo}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function apagar(idUsuario){
    var instrucao = `
    UPDATE AssociacaoComputadorUsuario 
    SET dataDesassociacao = NOW()
    WHERE fkUsuario = ${idUsuario} AND dataDesassociacao IS NULL
    AND idAssociacao IN (SELECT idAssociacao FROM (SELECT idAssociacao FROM AssociacaoComputadorUsuario WHERE fkUsuario = ${idUsuario} AND fkComputador = (SELECT fkComputador FROM AssociacaoComputadorUsuario WHERE fkUsuario = ${idUsuario})) AS TempTable);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);

}

function editarGestor(novoNome, novoEmail, novaSenha, nomeAntigo, emailAntigo, idUsuario){
    var instrucao = `
    UPDATE Usuario 
	SET nome = '${novoNome}', email = '${novoEmail}', senha = '${novaSenha}'
    WHERE idUsuario = ${idUsuario} and email = '${emailAntigo}' and nome = '${nomeAntigo}' and fkTipoUsuario = 1;
    `;
    return database.executar(instrucao);
}

function apagarGestor(idUsuario){
    var instrucao = `
    UPDATE AssociacaoComputadorUsuario 
    SET dataDesassociacao = NOW()
    WHERE fkUsuario = ${idUsuario} AND dataDesassociacao IS NULL
    AND idAssociacao IN (SELECT idAssociacao FROM (SELECT idAssociacao FROM AssociacaoComputadorUsuario WHERE fkUsuario = ${idUsuario} AND fkComputador = (SELECT fkComputador FROM AssociacaoComputadorUsuario WHERE fkUsuario = ${idUsuario})) AS TempTable);
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
    contarMaquinas,
    maquinas,
    idMaquina,
    listar,
    editar,
    apagar,
    editarGestor,

};