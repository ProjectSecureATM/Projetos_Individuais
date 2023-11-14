CREATE DATABASE secureATM;
USE secureATM;

CREATE TABLE empresa (
	id INT PRIMARY KEY AUTO_INCREMENT,
	razao_social VARCHAR(50),
	cnpj VARCHAR(14)
);

CREATE TABLE usuario (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50),
	fk_empresa INT,
	FOREIGN KEY (fk_empresa) REFERENCES empresa(id)
);


	CREATE TABLE CPU(
	idCPU INT PRIMARY KEY AUTO_INCREMENT,
	CPU1 double,
	CPU2 double,
	CPU3 double,
	momento DATETIME
	);
    
    CREATE TABLE MEMO(
	idMEMO INT PRIMARY KEY AUTO_INCREMENT,
	MEMO1 double,
	MEMO2 double,
	MEMO3 double,
    momento DATETIME
	);
    
    CREATE TABLE DISCO(
    idDISCO INT PRIMARY KEY AUTO_INCREMENT,
    DISCO1 double,
    DISCO2 double,
    DISCO3 double,
	momento DATETIME
    );

    CREATE TABLE Hardware(
	idHardware INT PRIMARY KEY auto_increment,
	fkCPU INT,
	fkMEMO INT,
	fkDISCO INT,
    constraint frkCPU foreign key(fkCPU)
    references CPU(idCPU),
    constraint frkMEMO foreign key(fkMEMO)
    references MEMO(idMEMO),
    constraint frkDISCO foreign key(fkDISCO)
    references DISCO(idDISCO)
);


    
    INSERT INTO CPU VALUES
    (null, 0.24, 0.25, 0.26, now());
    
    INSERT INTO DISCO VALUES
    (null, 0.30, 0.30, 0.30, now());
    
    INSERT INTO MEMO VALUES
    (null, 0.40, 0.50, 0.45, now());
    
    INSERT INTO Hardware VALUES
    (null,1,1,1);
    
    DROP VIEW VW_dadosPython;
    CREATE VIEW VW_dadosPython AS
    SELECT 
    idHardware,
    CPU.CPU1,
    CPU.CPU2,
    CPU.CPU3,
    CPU.momento as 'dtCPU',
    MEMO.MEMO1,
    MEMO.MEMO2,
    MEMO.MEMO3,
    MEMO.momento as'dtMemo',
    DISCO.DISCO1,
    DISCO.DISCO2,
    DISCO.DISCO3,
    DISCO.momento as 'dtDisco'
    FROM Hardware
    JOIN CPU 
    ON fkCPU = idCPU
    JOIN MEMO
    ON fkMEMO = idMEMO
    JOIN DISCO
    ON fkDISCO = idDisco;
    
    SELECT * FROM VW_dadosPython;
		    

    
