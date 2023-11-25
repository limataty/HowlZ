const e = require("express");
var database = require("../database/config");
const { escape } = require("mysql2");

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

function cadastrarFuncionario(nomeFuncionario, emailFuncionario, senhaFuncionario, fkEmpresa, fkGestor) {
    var instrucao = `
        INSERT INTO usuario (nome, email, senha, tipo, fkEmpresa, fkGestor) VALUES ('${nomeFuncionario}', '${emailFuncionario}', '${senhaFuncionario}', 'Funcionario', ${fkEmpresa}, ${fkGestor});
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

function contarMaquinas(fkGestor) {
    var instrucao = `
    SELECT COUNT(*) as maquinas
    FROM Usuario
    JOIN Computador ON Usuario.nome = Computador.nome
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
        Computador ON Usuario.nome = Computador.nome AND Usuario.fkEmpresa = Computador.fkEmpresa
    WHERE 
        Usuario.fkGestor = ${fkGestor};
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
    contarMaquinas,
    maquinas,
    idMaquina,
};