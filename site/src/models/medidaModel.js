var database = require("../database/config");

function buscarUltimasMedidas(idComputador, tipoComponente) {
  instrucaoSql = "";

  const limite_linhas = 7;

  if (process.env.AMBIENTE_PROCESSO == "producao") {
    instrucaoSql = `SELECT FORMAT(Monitoramento.dataHora, 'HH:mm:ss') as momento_grafico, 
    Monitoramento.valor as totalCaptacao
    FROM Componente
    JOIN Monitoramento ON Componente.idComponente = Monitoramento.fkComponente
    JOIN Computador ON Componente.fkComputador = Computador.idComputador
    WHERE Computador.idComputador = ${idComputador} AND Componente.tipo = ${tipoComponente}
    ORDER BY Monitoramento.dataHora DESC
    OFFSET 0 ROWS FETCH NEXT 5 ROWS ONLY;
`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT DATE_FORMAT(Monitoramento.dataHora, '%H:%i:%s') as momento_grafico, 
    Monitoramento.valor as totalCaptacao
FROM Componente
JOIN Monitoramento ON Componente.idComponente = Monitoramento.fkComponente
JOIN Computador ON Componente.fkComputador = Computador.idComputador
WHERE Computador.idComputador = ${idComputador} AND Componente.tipo = '${tipoComponente}'
ORDER BY Monitoramento.dataHora DESC
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
    instrucaoSql = `SELECT TOP 1
    FORMAT(Monitoramento.dataHora, 'HH:mm:ss') as momento_grafico,
    Monitoramento.valor as totalCaptacao
    FROM Componente
    JOIN Monitoramento ON Componente.idComponente = Monitoramento.fkComponente
    WHERE Componente.tipo = '${tipoComponente}' AND Componente.fkComputador = ${idComputador}
    ORDER BY Monitoramento.dataHora DESC;
`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT DATE_FORMAT(Monitoramento.dataHora, '%H:%i:%s') as momento_grafico, 
    Monitoramento.valor as totalCaptacao
    FROM Componente
    JOIN Monitoramento ON Componente.idComponente = Monitoramento.fkComponente
    WHERE Componente.tipo = '${tipoComponente}' AND Componente.fkComputador = ${idComputador}
    ORDER BY Monitoramento.dataHora DESC
    LIMIT 1;`;
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
    instrucaoSql = `SELECT DATE_FORMAT(Monitoramento.dataHora, '%H:%i:%s') as momento_grafico, 
    Monitoramento.valor as totalCaptacao
    FROM Componente
    JOIN Monitoramento ON Componente.idComponente = Monitoramento.fkComponente
    WHERE Componente.tipo = '${tipoComponente}' AND Componente.fkComputador = ${idComputador}
    ORDER BY Monitoramento.dataHora DESC
    LIMIT 1`;
  } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `SELECT DATE_FORMAT(Monitoramento.dataHora, '%H:%i:%s') as momento_grafico, 
    Monitoramento.valor as totalCaptacao
    FROM Componente
    JOIN Monitoramento ON Componente.idComponente = Monitoramento.fkComponente
    WHERE Componente.tipo = '${tipoComponente}' AND Componente.fkComputador = ${idComputador}
    ORDER BY Monitoramento.dataHora DESC
    LIMIT 1`;
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
};
