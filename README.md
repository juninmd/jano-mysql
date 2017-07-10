# Jano  MYSQL

## Exemplo de uso
    // Carregue a biblioteca
    // Passando no construtor as configurações do banco de dados  
    const mysql = require('jano-mysql')({
        host: 'localhost',
        user: 'root',
        database: 'meubanco',
        password: '',
        port: 3306
    });

    async function minhaFuncaoLegal() {
        // Inicia uma conexão (possibilita Transactions)
        let conexao = await mysql.beginTransaction();
        
        // Encerra a conexão (paramêtro não obrigatório)
        // true = commit | false = rollback
        let fechou = await conexao.endConnection(true);

        // Query livre, digite o que quiser.
        let motivos = await mysql.executeString('SELECT * FROM motivo');
        console.log(motivos.content);

        // Insert / Update de registro de tabelas
        let insert = await mysql.executeObject("INSERT INTO motivo SET ?", { DESCRICAO: 'teste' });
        console.log(insert);

        // Recomendado para retornar select de procedure
        let procedure = await mysql.readProcedure("SP_MOTIVO", [1]);
        console.log(procedure);
    };

## Por que usar Jano MYSQL?
  R. Seu código ficará muito mais belo e simples com o uso de Promises + Async Await