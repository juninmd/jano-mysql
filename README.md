# Jano  MYSQL

## Exemplo de utilidades
    // Carregue a biblioteca
    const mysql = require('jano-mysql');
    // Carregue as configurações do banco de dados  
    const webconfig = require('./webconfig.js');

    async function minhaFuncaoLegal() {
        // Inicia uma conexão (possibilita Transactions)
        let conexao = await mysql.beginTransaction(webconfig.dataConfig.MYSQL);
        
        // Encerra a conexão (paramêtro não obrigatório)
        // true = commit | false = rollback
        let fechou = await conexao.endConnection(true);

        // Query livre, digite o que quiser.
        let motivos = await mysql.executeString(webconfig.dataConfig.MYSQL, 'SELECT * FROM motivo');
        console.log(motivos.content);

        // Insert / Update de registro de tabelas
        let insert = await mysql.executeObject(webconfig.dataConfig.MYSQL, "INSERT INTO motivo SET ?", { DESCRICAO: 'teste' });
        console.log(insert);

        // Recomendado para retornar select de procedure
        let procedure = await mysql.readProcedure(webconfig.dataConfig.MYSQL, "SP_MOTIVO", [1]);
        console.log(procedure);
    };

## Por que usar Jano MYSQL?
  R. Seu código ficará muito mais belo e simples com o uso de Promises + Async Await