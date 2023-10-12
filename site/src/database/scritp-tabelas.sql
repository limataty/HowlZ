create database howlz;
use howlz;

create table empresa(
idEmpresa int primary key auto_increment,
nome varchar(50),
cnpj varchar(18),
email varchar(30) constraint chkEmpresa check (email like "%@%"),
senha varchar(30)
);


create table representante(
idRepresentante int primary key auto_increment,
nome varchar(50),
empresaID int,
foreign key (empresaID) references empresa(idEmpresa)
);


create table gestor (
idGestor int primary key auto_increment,
nome varchar(50),
cargo varchar(50),
email varchar(30) CONSTRAINT CHK_Empresa CHECK (email like "%@%" and "%.com%"),
senha varchar(30),
empresaID int,
foreign key (empresaID) references empresa(idEmpresa)
);


create table funcionarioHomeOffice (
idFuncionario int primary key auto_increment,
nome varchar(50),
empresaID int,
foreign key (empresaID) references empresa(idEmpresa)
);


create table monitoramento (
idMonitoramento int primary key auto_increment,
dataHora datetime,
usoCPU decimal(5,2),
usoMemoria decimal(5,2),
usoDisco decimal(5,2)
);


create table historicoManutencao (
idManutencao int primary key auto_increment,
dataDeManutencao datetime,
atualizacaoRealizada varchar(45),
reparos varchar(45)
);


create table maquina(
idMaquina int primary key auto_increment,
nome varchar(50),
sistemaOperacional varchar(20),
enderecoIP varchar(45),
statusMaquina varchar(45),
empresaID int,
historicoManutencaoID int,
monitoramentoID int,
foreign key (empresaID) references empresa(idEmpresa),
foreign key (historicoManutencaoID) references historicoManutencao(idManutencao),
foreign key (monitoramentoID) references monitoramento(idMonitoramento)
);


create table associacaoMaquinaFuncionario(
funcionarioID int,
maquinaID int,
idAssociacao int,
dataAssociacao datetime,
dataDesassociacao datetime,
foreign key (funcionarioID) references funcionarioHomeOffice(idFuncionario),
foreign key (maquinaID) references maquina(idMaquina),
primary key (idAssociacao)
);

show tables;
