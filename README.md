# jano-mysql

É uma biblioteca que utiliza o driver do `mysql` mantendo um código mais limpo, simples e organizado.

## Requisitos
    [Node 8+](https://nodejs.org/en/)
## Instalação
```bash
npm install jano-mysql --save
````
ou
```bash
yarn add jano-mysql
````
## Exemplos de uso
* Para carregar a biblioteca  
   coloque no construtor as configurações do banco de dados.  

```javascript

    const mysql = require('jano-mysql')({
        host: 'localhost',
        user: 'root',
        database: 'meubanco',
        password: '',
        port: 3306
    });

```
* Transaction  
Inicia uma conexão aberta com `transaction` 
```javascript
        let conexao = await mysql.beginTransaction();
 ```

* Encerra uma conexão (paramêtro não obrigatório) 

```javascript
 true = commit 
 false = rollback
  ```
```javascript
        let conexaoEncerrada = await conexao.endConnection(true);
 ```
* Query livre, digite o que quiser, o retorno ficará em `.content`

```javascript
        let motivos = await mysql.executeString('SELECT * FROM motivo');
        console.log(motivos.content);
```     
* Inserir/Atualizar registro

```javascript
        let insert = await mysql.executeObject("INSERT INTO motivo SET ?", { DESCRICAO: 'teste' });
        console.log(insert);
``` 

* Retornar registros de uma procedure
```javascript
        let procedure = await mysql.readProcedure("SP_MOTIVO", [1]);
        console.log(procedure);
    };
``` 
