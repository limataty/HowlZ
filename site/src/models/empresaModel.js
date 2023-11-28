var database = require("../database/config");

function editar(nomeFantasia, razaoSocial, apelido, fkEmpresa) {
    var instrucao = `
        UPDATE Empresa SET nomeFantasia = '${nomeFantasia}', razaoSocial = '${razaoSocial}', apelido = '${apelido}'
        WHERE idEmpresa = ${fkEmpresa};
    `;
    return database.executar(instrucao);
}

function editarAlertas(valorAlertaMinGPU, valorCriticoMinGPU, valorAlertaMaxGPU, valorCriticoMaxGPU, valorAlertaMinCPU, valorCriticoMinCPU, valorAlertaMaxCPU, valorCriticoMaxCPU, valorAlertaMinRAM, valorCriticoMinRAM, valorAlertaMaxRAM, valorCriticoMaxRAM, valorAlertaMinDISCO, valorCriticoMinDISCO, valorAlertaMaxDISCO, valorCriticoMaxDISCO, fkEmpresa, numeroMinino, numeroMaximo){
    var instrucao = `
    UPDATE Alerta 
    SET 
        minimo = 
            CASE 
                WHEN fkTipoAlerta = 1 AND fkTipoMonitoramentoComponente = 1 THEN ${valorAlertaMinCPU}
                WHEN fkTipoAlerta = 2 AND fkTipoMonitoramentoComponente = 1 THEN ${valorCriticoMinCPU}
                WHEN fkTipoAlerta = 1 AND fkTipoMonitoramentoComponente = 2 THEN ${valorAlertaMinRAM}
                WHEN fkTipoAlerta = 2 AND fkTipoMonitoramentoComponente = 2 THEN ${valorCriticoMinRAM}
                WHEN fkTipoAlerta = 1 AND fkTipoMonitoramentoComponente = 3 THEN ${valorAlertaMinDISCO}
                WHEN fkTipoAlerta = 2 AND fkTipoMonitoramentoComponente = 3 THEN ${valorCriticoMinDISCO}
                WHEN fkTipoAlerta = 1 AND fkTipoMonitoramentoComponente = 4 THEN ${valorAlertaMinGPU}
                WHEN fkTipoAlerta = 2 AND fkTipoMonitoramentoComponente = 4 THEN ${valorCriticoMinGPU}
                ELSE minimo
            END,
        maximo = 
            CASE 
                WHEN fkTipoAlerta = 1 AND fkTipoMonitoramentoComponente = 1 THEN ${valorAlertaMaxCPU}
                WHEN fkTipoAlerta = 2 AND fkTipoMonitoramentoComponente = 1 THEN ${valorCriticoMaxCPU}	
                WHEN fkTipoAlerta = 1 AND fkTipoMonitoramentoComponente = 2 THEN ${valorAlertaMaxRAM}
                WHEN fkTipoAlerta = 2 AND fkTipoMonitoramentoComponente = 2 THEN ${valorCriticoMaxRAM}
                WHEN fkTipoAlerta = 1 AND fkTipoMonitoramentoComponente = 3 THEN ${valorAlertaMaxDISCO}
                WHEN fkTipoAlerta = 2 AND fkTipoMonitoramentoComponente = 3 THEN ${valorCriticoMaxDISCO}
                WHEN fkTipoAlerta = 1 AND fkTipoMonitoramentoComponente = 4 THEN ${valorAlertaMaxGPU}
                WHEN fkTipoAlerta = 2 AND fkTipoMonitoramentoComponente = 4 THEN ${valorCriticoMaxGPU}
                ELSE maximo
            END
    WHERE fkEmpresa = ${fkEmpresa} AND idAlerta BETWEEN ${numeroMinino} AND ${numeroMaximo};
    `;
    return database.executar(instrucao);
}

function apagarAlertGPU(fkEmpresa, numeroMinino, numeroMaximo){
    var instrucao = `
    UPDATE Alerta
	SET minimo = null, maximo = null 
    WHERE fkEmpresa = ${fkEmpresa} AND idAlerta BETWEEN ${numeroMinino} and ${numeroMaximo};
    `;
    return database.executar(instrucao);
}

function apagarAlertRAM(fkEmpresa, numeroMinino, numeroMaximo){
    var instrucao = `
    UPDATE Alerta
	SET minimo = null, maximo = null 
    WHERE fkEmpresa = ${fkEmpresa} AND idAlerta BETWEEN ${numeroMinino} and ${numeroMaximo};
    `;
    return database.executar(instrucao);
}

function apagarAlertDISCO(fkEmpresa, numeroMinino, numeroMaximo){
    var instrucao = `
    UPDATE Alerta
	SET minimo = null, maximo = null 
    WHERE fkEmpresa = ${fkEmpresa} AND idAlerta BETWEEN ${numeroMinino} and ${numeroMaximo};
    `;
    return database.executar(instrucao);
}

function apagarAlertCPU(fkEmpresa, numeroMinino, numeroMaximo){
    var instrucao = `
    UPDATE Alerta
	SET minimo = null, maximo = null 
    WHERE fkEmpresa = ${fkEmpresa} AND idAlerta BETWEEN ${numeroMinino} and ${numeroMaximo};
    `;
    return database.executar(instrucao);
}



module.exports = {
    editar,
    editarAlertas,
    apagarAlertGPU,
    apagarAlertRAM,
    apagarAlertDISCO,
    apagarAlertCPU
};