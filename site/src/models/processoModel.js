const e = require("express");
var database = require("../database/config");
const { escape } = require("mysql2");

function contarProcesso(idMaquina) {
    var instrucao = "";
    
    if(process.env.AMBIENTE_PROCESSO == "producao"){
        instrucao = `
        SELECT 
        COUNT(*) AS TotalLinhas
        FROM 
        Processo
        JOIN MonitoramentoProcesso ON Processo.idProcesso = MonitoramentoProcesso.fkProcesso
        JOIN UnidadeMedida ON UnidadeMedida.idUnidadeMedida = MonitoramentoProcesso.fkUnidadeMedida
        JOIN TipoComponente ON TipoComponente.idTipoComponente = MonitoramentoProcesso.fkTipoComponente
        WHERE 
        MonitoramentoProcesso.dataHora >= DATEADD(DAY, -3, GETDATE()) AND fkComputador = ${idMaquina};
        `;
    } else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
    instrucao = `
    SELECT 
    COUNT(*) AS TotalLinhas
    FROM 
    Processo
    JOIN MonitoramentoProcesso ON idProcesso = fkProcesso
    JOIN UnidadeMedida ON idUnidadeMedida = fkUnidadeMedida
    JOIN TipoComponente ON idTipoComponente = fkTipoComponente
    WHERE 
    MonitoramentoProcesso.dataHora >= CURDATE() - INTERVAL 1 WEEK AND fkComputador = ${idMaquina};
    `;

    console.log(instrucao);
    return database.executar(instrucao);
    }
    
}

function contarJanela(idMaquina) {
    var instrucao = ""
    if(process.env.AMBIENTE_PROCESSO == "producao"){
        instrucao = `
        SELECT 
    COUNT(*) AS TotalLinhas
    FROM 
    Janela
    WHERE 
    dataHora >= DATEADD(DAY, -3, GETDATE()) AND fkComputador = ${idMaquina};
        `;
    }else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        instrucao = `
    SELECT 
    COUNT(*) AS TotalLinhas
FROM 
    Janela
WHERE 
    dataHora >= CURDATE() - INTERVAL 1 WEEK AND fkComputador = ${idMaquina};
    `;
    }
    console.log(instrucao);
    return database.executar(instrucao);
}

function exibirProcesso(fkGestor, idMaquina) {
    var instrucao = "";

    if(process.env.AMBIENTE_PROCESSO == "producao"){
        instrucao = `
        WITH RankedMonitoramento AS (
            SELECT
                Processo.nome AS NomeProcesso, 
                MonitoramentoProcesso.dataHora,
                fkTipoComponente,
                TipoComponente.nome as NomeComponente,
                MonitoramentoProcesso.valor as uso,
                UnidadeMedida.simbolo,
                ROW_NUMBER() OVER (PARTITION BY Processo.idProcesso ORDER BY MonitoramentoProcesso.dataHora DESC) AS RowNum
            FROM 
                Processo
            JOIN 
                MonitoramentoProcesso ON Processo.idProcesso = MonitoramentoProcesso.fkProcesso
            JOIN 
                UnidadeMedida ON UnidadeMedida.idUnidadeMedida = MonitoramentoProcesso.fkUnidadeMedida
            JOIN 
                TipoComponente ON TipoComponente.idTipoComponente = MonitoramentoProcesso.fkTipoComponente
            WHERE 
                Processo.fkComputador = ${idMaquina} AND
                MonitoramentoProcesso.dataHora >= DATEADD(DAY, -3, GETDATE())
        )
        SELECT
            NomeProcesso,
            dataHora,
            fkTipoComponente,
            NomeComponente,
            uso,
            simbolo
        FROM 
            RankedMonitoramento
        WHERE 
            RowNum = 1
        ORDER BY 
            dataHora DESC;
        
        `;
    } else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        instrucao = `
    SELECT
    Processo.nome AS NomeProcesso,
    MonitoramentoProcesso.dataHora,
    fkTipoComponente,
    TipoComponente.nome as NomeComponente,
    uso,
    UnidadeMedida.simbolo
    FROM
    Processo
    JOIN MonitoramentoProcesso ON idProcesso = fkProcesso
    JOIN UnidadeMedida ON idUnidadeMedida = fkUnidadeMedida
    JOIN TipoComponente ON idTipoComponente = fkTipoComponente
    WHERE
    Processo.fkComputador = ${idMaquina} AND
    MonitoramentoProcesso.dataHora >= CURDATE() - INTERVAL 1 WEEK
    LIMIT 1;
    `;
    }

    console.log(instrucao);
    return database.executar(instrucao);
}

function exibirJanela(fkGestor, idMaquina) {
    var instrucao = ""
    if(process.env.AMBIENTE_PROCESSO == "producao"){
        instrucao = `
        WITH RankedJanelas AS (
            SELECT
                titulo,
                dataHora,
                ROW_NUMBER() OVER (PARTITION BY titulo ORDER BY dataHora DESC) AS RowNum
            FROM 
                Janela
            WHERE 
                dataHora >= DATEADD(DAY, -3, GETDATE()) AND 
                fkComputador = ${idMaquina} AND 
                titulo IS NOT NULL
        )
        SELECT
            titulo,
            dataHora
        FROM 
            RankedJanelas
        WHERE 
            RowNum = 1
        ORDER BY 
            dataHora DESC;
        `;
    } else if(process.env.AMBIENTE_PROCESSO == "desenvolvimento"){
        instrucao = `
    SELECT DISTINCT titulo, dataHora FROM Janela
    WHERE dataHora >= CURDATE() - INTERVAL 1 WEEK AND fkComputador = ${idMaquina} AND titulo IS NOT NULL
LIMIT 1;
    `;
    }
    
    console.log(instrucao);
    return database.executar(instrucao);
}


module.exports = {
    exibirProcesso,
    exibirJanela,
    contarProcesso,
    contarJanela
};