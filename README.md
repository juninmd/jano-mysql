# jano-mysql

## [EN]  

It is a library that uses the `mysql` driver to keep code clean, simple, organized and with Promises.

## Requirements
* [Node 8+](https://nodejs.org/en/)

## Installation
```bash
npm install jano-mysql --save
````
or
```bash
yarn add jano-mysql
````
## Examples of use
* To load the library,
  put the database settings inside the constructor.  

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
Starts an open `transaction`
```javascript
let conexao = await mysql.beginTransaction();
 ```
* Execute commands in the transaction
 ```javascript
let transacaoA = await mysql.executeTransaction(conexao, "INSERT INTO venda SET ?", { IDPRODUTO: 1, IDCLIENTE: 2 })

let transacaoB = await mysql.executeTransaction(conexao, `UPDATE estoque SET ? WHERE IDESTOQUE = ${IDESTOQUE}`, { VALOR: 2 })
 ```

* Terminates a connection (non-mandatory parameter)

```javascript
true = commit 
false = rollback
  ```
```javascript
let conexaoEncerrada = await conexao.endConnection(true);
 ```
* Free Query, enter whatever you want, the return will be in `.content`

```javascript
let motivos = await mysql.executeString('SELECT * FROM motivo');
console.log(motivos.content);
```     
* Insert/Update record

```javascript
let insert = await mysql.executeObject("INSERT INTO motivo SET ?", { DESCRICAO: 'teste' });
console.log(insert);
``` 

* Return records from a procedure
```javascript
let procedure = await mysql.readProcedure("SP_MOTIVO", [1]);
console.log(procedure);
``` 


## [PT-BR]  

É uma biblioteca que utiliza o driver do `mysql` mantendo um código mais limpo, simples, organizado com Promises.

## Requisitos
* [Node 8+](https://nodejs.org/en/)
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
* Transação  
Inicia uma conexão aberta com `transaction` 
```javascript
let conexao = await mysql.beginTransaction();
 ```
* Execute comandos na transação
 ```javascript
let transacaoA = await mysql.executeTransaction(conexao, "INSERT INTO venda SET ?", { IDPRODUTO: 1, IDCLIENTE: 2 })

let transacaoB = await mysql.executeTransaction(conexao, `UPDATE estoque SET ? WHERE IDESTOQUE = ${IDESTOQUE}`, { VALOR: 2 })
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
``` 
