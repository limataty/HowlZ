create database howlz;
use howlz;

CREATE TABLE Empresa (
  idEmpresa INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  Nome VARCHAR(50) NULL,
  cnpj CHAR(18) NULL,
  email VARCHAR(45) NULL
  /*telefone CHAR(11) NULL*/
);

CREATE TABLE Usuario (
  idUsuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NULL,
  cargo VARCHAR(45),
  email VARCHAR(45) NULL,
  senha VARCHAR(45) NULL,
  tipo ENUM('Representante', 'Gestor', 'Funcionario') NULL,
  dataCadastro DATETIME default current_timestamp,
  fkEmpresa INT NOT NULL,
  CONSTRAINT fk_FuncionarioHomeOffice_Empresa1
    FOREIGN KEY (fkEmpresa)
    REFERENCES Empresa (idEmpresa)
);


CREATE TABLE Computador (
  idComputador INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NULL,
  sistemaOperacional VARCHAR(45) NULL,
  numeroSerial VARCHAR(45) NULL,
  codigo VARCHAR(45) NULL,
  stts ENUM('LIGADO', 'DESLIGADO', 'MANUTENCAO') NULL,
  fkEmpresa INT NOT NULL,
  CONSTRAINT fk_Maquina_Empresa1
    FOREIGN KEY (fkEmpresa)
    REFERENCES Empresa (idEmpresa)
);


CREATE TABLE Manutencao (
  idhistoricoManutencao INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  dataDeManutencao DATE NULL,
  atualizacaoRealizada VARCHAR(45) NULL,
  reparos VARCHAR(45) NULL,
  fkComputador INT NOT NULL,
  CONSTRAINT fk_historicoManutencao_Maquina1
    FOREIGN KEY (fkComputador)
    REFERENCES Computador (idComputador)
);


CREATE TABLE Componente (
  idComponente INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  tipo ENUM('CPU', 'RAM', 'DISCO', 'GPU') NULL,
  modelo VARCHAR(100) NULL,
  fkComputador INT NOT NULL,
  CONSTRAINT fk_Componente_Maquina1
    FOREIGN KEY (fkComputador)
    REFERENCES Computador (idComputador)
);


CREATE TABLE Monitoramento (
  idMonitoramento INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  dataHora DATETIME NULL default current_timestamp,
  valor DECIMAL(5,2) NULL,
  tipo ENUM('PORCENTAGEMUSO', 'FREQUENCIA', 'GBUSO', 'GBDISPONIVEL') NULL,
  fkComponente INT NOT NULL,
  CONSTRAINT fk_Monitoramento_Componente1
    FOREIGN KEY (fkComponente)
    REFERENCES Componente (idComponente)
);


CREATE TABLE AssociacaoComputadorUsuario (
  idAssociacao INT NOT NULL,
  fkUsuario INT NOT NULL,
  fkComputador INT NOT NULL,
  dataAssociacao DATETIME NULL,
  dataDesassociacao DATETIME NULL,
  PRIMARY KEY (idAssociacao, fkUsuario, fkComputador),
  CONSTRAINT fk_FuncionarioHomeOffice_has_Maquina_FuncionarioHomeOffice1
    FOREIGN KEY (fkUsuario)
    REFERENCES Usuario (idUsuario),
  CONSTRAINT fk_FuncionarioHomeOffice_has_Maquina_Maquina1
    FOREIGN KEY (fkComputador)
    REFERENCES Computador (idComputador)
);


CREATE TABLE Janela (
  idJanela INT PRIMARY KEY AUTO_INCREMENT
);


CREATE TABLE Processo (
  idProcesso INT PRIMARY KEY AUTO_INCREMENT,
  fkComponente INT NOT NULL,
  fkJanela INT NULL,
  CONSTRAINT fk_Processo_Componente1
    FOREIGN KEY (fkComponente)
    REFERENCES Componente (idComponente),
  CONSTRAINT fk_Processo_Janela1
    FOREIGN KEY (fkJanela)
    REFERENCES Janela (idJanela)
);
