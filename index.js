const mu = require('../messageUtil');
const mysql = require('mysql');

module.exports = {
    executeString: (connectionString, query) => {
        var rm = requestMessage(200, '', '', '', query);
        return MySqlInit(databaseName).executeString(rm, query);
    },
    execute: (connectionString, table, object) => {
        var rm = requestMessage(200, '', '', '', table);
        return MySqlInit(databaseName).execute(rm, table, object)
    },
    executeProcedure: (connectionString, procedure, array) => {
        var rm = requestMessage(200, '', '', array.toString(), procedure);
        return MySqlInit(databaseName).executeProcedure(rm, array);
    },
    readProcedure: (connectionString, procedure, array) => {
        var rm = requestMessage(200, '', '', array.toString(), procedure);
        return MySqlInit(databaseName).readProcedure(rm, array);
    },
    beginTransaction: (connectionString) => {
        return new Promise((resolve, reject) => {
            let db = MySqlInit(databaseName);
            await db.connection().beginTransaction((err) => {
                return err ? reject(err) : resolve(db.connection());
            });
        });
    },
    executeTransaction: (connection, table, object) => {
        return new Promise((resolve, reject) => {
            var rm = requestMessage(200, '', '', object, table);
            return require("./coreMysql.js")(connection).executeTransaction(rm, table, object);
        });
    },
}

async function MySqlInit(connectionString) {
    return await new Promise((resolve, reject) => {
        try {
            var connection = mysql.createConnection(connectionString);
            connection.connect((err) => {
                if (err && err.code == "ECONNREFUSED") {
                    return reject({ message: { userMessage: "Não foi possível conectar ao banco de dados.", developerMessage: err.message } });
                }
                return resolve(require("./coreMysql.js")(connection));
            });
        } catch (err) {
            return reject({ message: { userMessage: "Não foi possível conectar ao banco de dados." } });
        }
    });
}