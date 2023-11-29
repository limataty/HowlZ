var database = require("../database/config");

function contarProcessoModel(idMaquina) {
    var instrucao = "";

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
        SELECT 
            COUNT(*) AS TotalLinhas
        FROM 
            Processo
            JOIN MonitoramentoProcesso ON Processo.idProcesso = MonitoramentoProcesso.fkProcesso
            JOIN UnidadeMedida ON UnidadeMedida.idUnidadeMedida = MonitoramentoProcesso.fkUnidadeMedida
            JOIN TipoComponente ON TipoComponente.idTipoComponente = MonitoramentoProcesso.fkTipoComponente
        WHERE 
            MonitoramentoProcesso.dataHora >= DATEADD(DAY, -2, GETDATE()) AND fkComputador = ${idMaquina};
        `;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
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
    }

    console.log(instrucao);
    return database.executar(instrucao);
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

function exibirProcesso(idMaquina) {
    var instrucao = "";

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucao = `
        WITH RankedMonitoramento AS (
            SELECT
                Processo.nome AS NomeProcesso, 
                FORMAT(MonitoramentoProcesso.dataHora, 'yyyy-MM-dd HH:mm:ss') AS dataHoraFormatada,
                fkTipoComponente,
                TipoComponente.nome AS NomeComponente,
                MonitoramentoProcesso.valor AS uso,
                UnidadeMedida.simbolo,
                ROW_NUMBER() OVER (PARTITION BY Processo.idProcesso ORDER BY MonitoramentoProcesso.dataHora DESC) AS RowNum
            FROM 
                Processo
                JOIN MonitoramentoProcesso ON Processo.idProcesso = MonitoramentoProcesso.fkProcesso
                JOIN UnidadeMedida ON UnidadeMedida.idUnidadeMedida = MonitoramentoProcesso.fkUnidadeMedida
                JOIN TipoComponente ON TipoComponente.idTipoComponente = MonitoramentoProcesso.fkTipoComponente
            WHERE 
                Processo.fkComputador = ${idMaquina} AND
                MonitoramentoProcesso.dataHora >= DATEADD(DAY, -2, GETDATE())
        )
        SELECT
            NomeProcesso,
            dataHoraFormatada AS dataHora,
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
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
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
        ORDER BY 
            MonitoramentoProcesso.dataHora DESC
        LIMIT 1;
        `;
    }

    console.log(instrucao);
    return database.executar(instrucao);
}

function exibirJanela(idMaquina) {
    var instrucao = ""
    if(process.env.AMBIENTE_PROCESSO == "producao"){
        instrucao = `
        WITH RankedJanelas AS (
            SELECT
                titulo,
                FORMAT(Janela.dataHora, 'yyyy-MM-dd HH:mm:ss') AS dataHora,
                ROW_NUMBER() OVER (PARTITION BY titulo ORDER BY dataHora DESC) AS RowNum
            FROM 
                Janela
            WHERE 
                dataHora >= DATEADD(DAY, -2, GETDATE()) AND 
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
    contarProcessoModel,
    contarJanela
};