
import { ErrorRequestHandler } from "express";
import config from "../../config";
import { IGenericErrorMessage } from "../../globalInterfaces/error";
import handleValidationError from "../../Errors/handleValidationError";
import ApiError from "../../Errors/ApiError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let statusCode = 500;
    let message = 'something went wrong'
    let errorMessages: IGenericErrorMessage[] = []


    if (err.name === "ValidatorError") {
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorMessages = simplifiedError.errorMessages
    }
    else if (err instanceof ApiError) {
        statusCode = err.statusCode
        message = err.message
        errorMessages = err?.message ? [{
            path: '',
            message: err?.message
        }] : []
    }
    else if (err instanceof Error) {
        statusCode = 400;
        message = err?.message;
        errorMessages = err?.message ? [{
            path: '',
            message: err?.message
        }] : []

    }


    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: config.env !== 'production' ? err?.stack : undefined
    })

    next()
}

export default globalErrorHandler;