export const formatResponse = (data, message = 'Success', status = 200) => {
    return {
        status,
        message,
        data
    };
};

export const formatError = (error, status = 500) => {
    return {
        status,
        message: error.message || 'Internal Server Error',
        error: error.details || null
    };
};