const mu = require('./messageUtil');

module.exports = (connection) => {
    return {
        executeString: (rm, query) => {
            return new Promise((resolve, reject) => {
                connection.query(query, (err, rows, fields) => {
                    if (err) {
                        connection.end(() => {
                            return reject(mu.setError(rm, 500, "Ocorreu um problema com essa operação, tente novamente.", err.message));
                        });
                    }
                    else {
                        connection.end(() => {
                            if (rows.length == 0) {
                                return resolve({ metaData: [], content: [] });
                            }
                            else {
                                return resolve({ metaData: fields, content: rows });
                            }
                        });
                    }
                });
            });
        },
        executeProcedure: (rm, array) => {
            return new Promise((resolve, reject) => {
                connection.query('CALL ?? (?)', [rm.package, array], (err, result) => {
                    if (err) {
                        connection.end(() => {
                            return reject(mu.setError(rm, 500, "Ocorreu um problema com essa operação, tente novamente.", err.message));
                        });
                    }
                    else {
                        connection.commit(() => {
                            connection.end(() => {
                                if (result.affectedRows == 1) {
                                    return resolve({ metaData: [], content: { retorno: 'OK', Id: result.insertId } });
                                }
                                else {
                                    return resolve(mu.setError(rm, 500, "Ocorreu um problema com essa operação, tente novamente.", "O registro não foi adicionado."));
                                }
                            });
                        });
                    }
                });
            });
        },
        readProcedure: (rm, array, ) => {
            return new Promise((resolve, reject) => {
                connection.query('CALL ?? (?)', [rm.package, array], (err, result) => {
                    if (err) {
                        connection.end(() => {
                            return resolve(mu.setError(rm, 500, "Ocorreu um problema com essa operação, tente novamente.", err.message));
                        });
                    }
                    else {
                        connection.end(() => {
                            return resolve({ content: result[0] });
                        });
                    }
                });
            });
        },
        execute: (rm, table, object, ) => {
            return new Promise((resolve, reject) => {
                connection.query(table, object, (err, info) => {
                    if (err) {
                        connection.end(() => {
                            return reject(mu.setError(rm, 500, "Ocorreu um problema com essa operação, tente novamente.", err.message));
                        });
                    }
                    else {
                        connection.end(() => {
                            if (info.affectedRows == 0) {
                                return resolve(mu.setError(rm, 500, "Ocorreu um problema com essa operação, tente novamente.", "Registro não foi inserido."));
                            }
                            else {
                                return resolve({ metaData: [], content: info.insertId });
                            }
                        })
                    }
                });
            });
        },
        executeTransaction: (rm, table, object) => {
            return new Promise((resolve, reject) => {
                connection.query(table, object, (err, info) => {
                    if (err) {
                        return resolve(mu.setError(rm, 500, "Ocorreu um problema com essa operação, tente novamente.", err.message));
                    }
                    else {
                        if (info.affectedRows == 0) {
                            return resolve(mu.setError(rm, 500, "Ocorreu um problema com essa operação, tente novamente.", "Registro não foi inserido."));
                        }
                        else {
                            return resolve({ metaData: [], content: info.insertId });
                        }
                    }
                });
            });
        },
        connection: () => {
            return connection;
        }
    }
};