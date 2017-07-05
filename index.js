const mu = require('./messageUtil');
const mysql = require('mysql');

module.exports = {
    executeString: (connectionString, query) => {
        return executeString(connectionString, query);
    },
    executeObject: (connectionString, table, object) => {
        return executeObject(connectionString, table, object);
    },
    executeProcedure: (connectionString, procedure, array) => {
        return executeProcedure(connectionString, procedure, array);
    },
    readProcedure: (connectionString, procedure, array) => {
        return readProcedure(connectionString, procedure, array);
    },
    beginTransaction: (connectionString) => {
        return beginTransaction(connectionString);
    },
    executeTransaction: (connection, table, object) => {
        return executeTransaction(connection, table, object);
    },
}

async function executeString(connectionString, query) {
    let newMu = mu.new(200, null, null, null, null, null);
    let connection = await MySqlInit(connectionString);
    return await require("./coreMysql.js")(connection).executeString(newMu, query);
}

async function executeObject(connectionString, table, object) {
    let newMu = mu.new(200, null, null, null, table, null);
    let connection = await MySqlInit(connectionString);
    return require("./coreMysql.js")(connection).executeObject(newMu, table, object)
}

async function executeProcedure(connectionString, procedure, array) {
    let newMu = mu.new(200, null, null, array, null, procedure);
    let connection = await MySqlInit(connectionString);
    return require("./coreMysql.js")(connection).executeProcedure(newMu);
}

async function readProcedure(connectionString, procedure, array) {
    let newMu = mu.new(200, null, null, array, null, procedure);
    let connection = await MySqlInit(connectionString);
    return require("./coreMysql.js")(connection).readProcedure(newMu, array);
}

async function beginTransaction(connectionString) {
    let connection = await MySqlInit(connectionString);
    return new Promise((resolve, reject) => {
        return connection.beginTransaction((err) => {
            return err ? reject(err) : resolve(connection);
        });
    });
}

async function executeTransaction(connection, table, object) {
    return new Promise((resolve, reject) => {
        let newmu = mu.new(200, '', '', object, table);
        return require("./coreMysql.js")(connection).executeTransaction(newMu, table, object);
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