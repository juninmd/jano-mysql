const mu = require('./messageUtil');
const mysql = require('mysql');
let CONNECTIONSTRING = {};
module.exports = (connectionString) => {
    CONNECTIONSTRING = connectionString;
    return {
        executeString: async (query) => {
            let newMu = mu.new(200, null, null, null, null, null);
            let connection = await MySqlInit();
            return await require("./coreMysql.js")(connection).executeString(newMu, query);
        },
        executeObject: async (query, object) => {
            let newMu = mu.new(200, null, null, null, query, null);
            let connection = await MySqlInit();
            return require("./coreMysql.js")(connection).executeObject(newMu, query, object)
        },
        executeProcedure: async (procedure, array) => {
            let newMu = mu.new(200, null, null, array, null, procedure);
            let connection = await MySqlInit();
            return require("./coreMysql.js")(connection).executeProcedure(newMu);
        },
        readProcedure: async (procedure, array) => {
            let newMu = mu.new(200, null, null, array, null, procedure);
            let connection = await MySqlInit();
            return require("./coreMysql.js")(connection).readProcedure(newMu, array);
        },
        beginTransaction: async () => {
            let connection = await MySqlInit();
            return new Promise((resolve, reject) => {
                return connection.beginTransaction((err) => {
                    return err ? reject(err) : resolve(connection);
                });
            });
        },
        executeTransaction: async (connection, query, object) => {
            let newMu = mu.new(200, '', '', object, query);
            return require("./coreMysql.js")(connection).executeTransaction(newMu, query, object);
        }
    }
}

let MySqlInit = () => {
    let connection = mysql.createConnection(CONNECTIONSTRING);
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
    let _self = this;
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