var database = require("../database/config");

function buscarUltimasMedidas(idComputador, tipoComponente) {
  instrucaoSql = "";

  const limite_linhas = 7;

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT 
    FORMAT(MonitoramentoComponente.dataHora, 'HH:mm:ss') AS momento_grafico, 
    MonitoramentoComponente.valor AS totalCaptacao
FROM
    Componente
JOIN 
    MonitoramentoComponente ON Componente.idComponente = MonitoramentoComponente.fkComponente
JOIN 
    Computador ON Componente.fkComputador = Computador.idComputador
WHERE 
    Computador.idComputador = ${idComputador} AND MonitoramentoComponente.fkTipoMonitoramentoComponente = ${tipoComponente}
ORDER BY 
    MonitoramentoComponente.dataHora DESC
OFFSET 0 ROWS
FETCH FIRST 5 ROWS ONLY;
`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT DATE_FORMAT(MonitoramentoComponente.dataHora, '%H:%i:%s') as momento_grafico, 
    MonitoramentoComponente.valor as totalCaptacao
FROM Componente
JOIN MonitoramentoComponente ON Componente.idComponente = MonitoramentoComponente.fkComponente
JOIN Computador ON Componente.fkComputador = Computador.idComputador
WHERE Computador.idComputador = 1 AND fkTipoMonitoramentoComponente = ${idComputador} AND fkComponente = ${tipoComponente}
ORDER BY MonitoramentoComponente.dataHora DESC
LIMIT 5;
`;
  } else {
    console.log(
      "\nO AMBIENTE (producao OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idComputador, tipoComponente) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT 
    FORMAT(MonitoramentoComponente.dataHora, 'HH:mm:ss') AS momento_grafico, 
    MonitoramentoComponente.valor AS totalCaptacao
FROM 
    Componente
JOIN 
    MonitoramentoComponente ON Componente.idComponente = MonitoramentoComponente.fkComponente
WHERE 
    MonitoramentoComponente.fkTipoMonitoramentoComponente = ${tipoComponente} AND Componente.fkComputador = ${idComputador}
ORDER BY 
    MonitoramentoComponente.dataHora DESC
OFFSET 0 ROWS
FETCH FIRST 1 ROW ONLY;

`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT DATE_FORMAT(MonitoramentoComponente.dataHora, '%H:%i:%s') as momento_grafico, 
    MonitoramentoComponente.valor as totalCaptacao
    FROM Componente
    JOIN MonitoramentoComponente ON Componente.idComponente = MonitoramentoComponente.fkComponente
    WHERE MonitoramentoComponente.fkTipoMonitoramentoComponente = ${tipoComponente} AND Componente.fkComputador = ${idComputador}
    ORDER BY MonitoramentoComponente.dataHora DESC
    LIMIT 1;
    `;
  } else {
    console.log(
      "\nO AMBIENTE (producao OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoRealDisparos(idComputador, tipoComponente) {
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT 
    FORMAT(MonitoramentoComponente.dataHora, 'HH:mm:ss') AS momento_grafico, 
    MonitoramentoComponente.valor AS totalCaptacao
FROM 
    Componente
JOIN 
    MonitoramentoComponente ON Componente.idComponente = MonitoramentoComponente.fkComponente
WHERE 
    MonitoramentoComponente.fkTipoMonitoramentoComponente = ${tipoComponente} AND Componente.fkComputador = ${idComputador}	
ORDER BY 
    MonitoramentoComponente.dataHora DESC
OFFSET 0 ROWS
FETCH FIRST 1 ROW ONLY;

    `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT DATE_FORMAT(MonitoramentoComponente.dataHora, '%H:%i:%s') as momento_grafico, 
    MonitoramentoComponente.valor as totalCaptacao
    FROM Componente
    JOIN MonitoramentoComponente ON Componente.idComponente = MonitoramentoComponente.fkComponente
    WHERE MonitoramentoComponente.fkTipoMonitoramentoComponente = ${tipoComponente} AND Componente.fkComputador = ${idComputador}
    ORDER BY MonitoramentoComponente.dataHora DESC
    LIMIT 1;
    `;
  } else {
    console.log(
      "\nO AMBIENTE (producao OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function alertas(fkEmpresa){
  instrucaoSql = `
  SELECT
    MIN(CASE WHEN fkTipoAlerta = 1 AND fkTipoMonitoramentoComponente = 1 THEN minimo END) AS alertaCPU,
    MIN(CASE WHEN fkTipoAlerta = 2 AND fkTipoMonitoramentoComponente = 1 THEN minimo END) AS criticoCPU,
    MIN(CASE WHEN fkTipoAlerta = 1 AND fkTipoMonitoramentoComponente = 2 THEN minimo END) AS alertaRAM,
    MIN(CASE WHEN fkTipoAlerta = 2 AND fkTipoMonitoramentoComponente = 2 THEN minimo END) AS criticoRAM,
    MIN(CASE WHEN fkTipoAlerta = 1 AND fkTipoMonitoramentoComponente = 3 THEN minimo END) AS alertaDISCO,
    MIN(CASE WHEN fkTipoAlerta = 2 AND fkTipoMonitoramentoComponente = 3 THEN minimo END) AS criticoDISCO,
    MIN(CASE WHEN fkTipoAlerta = 1 AND fkTipoMonitoramentoComponente = 4 THEN minimo END) AS alertaGPU,
    MIN(CASE WHEN fkTipoAlerta = 2 AND fkTipoMonitoramentoComponente = 4 THEN minimo END) AS criticoGPU
FROM
    Alerta
WHERE
    fkEmpresa = ${fkEmpresa};
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function botoes(idComputador){
  instrucaoSql = "";

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT 
    MAX(CASE WHEN MonitoramentoComponente.fkTipoMonitoramentoComponente = 4 THEN MonitoramentoComponente.valor END) AS monitoramentoGPU,
    MAX(CASE WHEN MonitoramentoComponente.fkTipoMonitoramentoComponente = 2 THEN MonitoramentoComponente.valor END) AS monitoramentoRAM,
    MAX(CASE WHEN MonitoramentoComponente.fkTipoMonitoramentoComponente = 3 THEN MonitoramentoComponente.valor END) AS monitoramentoDISCO,
    MAX(CASE WHEN MonitoramentoComponente.fkTipoMonitoramentoComponente = 1 THEN MonitoramentoComponente.valor END) AS monitoramentoCPU,
    MonitoramentoComponente.dataHora
FROM 
    MonitoramentoComponente
JOIN 
    Componente ON MonitoramentoComponente.fkComponente = Componente.idComponente
WHERE 
    Componente.fkComputador = ${idComputador}
GROUP BY
    MonitoramentoComponente.dataHora
ORDER BY 
    MonitoramentoComponente.dataHora DESC
OFFSET 0 ROWS
FETCH FIRST 1 ROWS ONLY;

    `;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT 
    MAX(CASE WHEN MonitoramentoComponente.fkTipoMonitoramentoComponente = 4 THEN MonitoramentoComponente.valor END) AS monitoramentoGPU,
    MAX(CASE WHEN MonitoramentoComponente.fkTipoMonitoramentoComponente = 2 THEN MonitoramentoComponente.valor END) AS monitoramentoRAM,
    MAX(CASE WHEN MonitoramentoComponente.fkTipoMonitoramentoComponente = 3 THEN MonitoramentoComponente.valor END) AS monitoramentoDISCO,
    MAX(CASE WHEN MonitoramentoComponente.fkTipoMonitoramentoComponente = 1 THEN MonitoramentoComponente.valor END) AS monitoramentoCPU,
    MonitoramentoComponente.dataHora
FROM 
    MonitoramentoComponente
JOIN 
    Componente ON MonitoramentoComponente.fkComponente = Componente.idComponente
WHERE 
    Componente.fkComputador = ${idComputador}
GROUP BY 
    MonitoramentoComponente.dataHora
ORDER BY 
    MonitoramentoComponente.dataHora DESC
LIMIT 1;
`;
  } else {
    console.log(
      "\nO AMBIENTE (producao OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n"
    );
    return;
  }

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarUltimasMedidas,
  buscarMedidasEmTempoReal,
  buscarMedidasEmTempoRealDisparos,
  alertas,
  botoes,
};
