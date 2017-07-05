const mu = require('./messageUtil');
const mysql = require('mysql');
const { promisify } = require('util');

module.exports = {
    executeString: (connectionString, query) => {
        let newMu = mu.new(200, null, null, null, null, null);
        return MySqlInit(connectionString).executeString(rm, query);
    },
    execute: (connectionString, table, object) => {
        let newMu = mu.new(200, null, null, null, table, null);
        return MySqlInit(connectionString).execute(rm, table, object)
    },
    executeProcedure: (connectionString, procedure, array) => {
        let newMu = mu.new(200, null, null, array.toString(), null, procedure);
        return MySqlInit(connectionString).executeProcedure(rm, array);
    },
    readProcedure: (connectionString, procedure, array) => {
        let newMu = mu.new(200, null, null, array.toString(), null, procedure);
        return MySqlInit(connectionString).readProcedure(rm, array);
    },
    beginTransaction: (connectionString) => {
        return beginTransaction(connectionString);
    },
    executeTransaction: (connection, table, object) => {
        return new Promise((resolve, reject) => {
            let newmu = mu.new(200, '', '', object, table);
            return require("./coreMysql.js")(connection).executeTransaction(rm, table, object);
        });
    },
}



async function beginTransaction(connectionString) {
    let connection = await MySqlInit(connectionString);
    return new Promise((resolve, reject) => {
        return connection.beginTransaction((err) => {
            return err ? reject(err) : resolve(connection);
        });
    });
}


function MySqlInit(connectionString) {
    let connection = mysql.createConnection(connectionString);
    connection.__proto__.endConnection = endConnection;
    return new Promise((resolve, reject) => {
        return connection.connect((err) => {
            return err ? reject(err) : resolve(connection);
        });
    });
}

function endConnection(commit) {
    if (commit == undefined)
        commit = true;
    var _self = this;
    if (commit) {
        return new Promise((resolve, reject) => {
            _self.commit(() => {
                _self.end(() => {
                    return resolve({ 'conexão': 'encerrada', status: 'comitado' });
                });
            });
        })
    }
    else {
        return new Promise((resolve, reject) => {
            _self.rollback(() => {
                _self.end(() => {
                    return resolve({ 'conexão': 'encerrada', status: 'rollback' });
                });
            });
        })
    }
};