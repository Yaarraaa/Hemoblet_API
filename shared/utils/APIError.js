class ApiError extends Error {
    statusCode;
    constructor(message, statusCode, statusText) {
       super(message);
       this.statusCode = statusCode;
    }
}
 
const createError = (message, statusCode) => {
    return new ApiError(message, statusCode);
};
 

module.exports = {
    ApiError,
    createError
}