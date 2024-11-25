class CustomError extends Error{
    constructor(message, statusCode, data=null){
        super(message);
        this.statusCode = statusCode;
        this.data = data
        this.isOperational = true
    }
}

const createError = (message, statusCode, data = null) => 
    {
        return new CustomError(message, statusCode, data)
    }

export {CustomError, createError}