module.exports = {
    new: (statusCode, userMessage, developerMessage, parametros, tabela, procedure) => {
        return {
            statusCode: statusCode,
            message: {
                userMessage: '',
                developerMessage: ''
            },
            database: {
                parametros: parametros,
                tabela: tabela,
                procedure: procedure
            }
        };
    },
    setError: (mu, statusCode, userMessage, developerMessage) => {
        mu.content = null;
        mu.statusCode = statusCode;
        rm.isSuccess = statusCode >= 200 || statusCode < 300;
        rm.message = {
            developerMessage: developerMessage,
            userMessage: userMessage
        };
        return mu;
    }
}