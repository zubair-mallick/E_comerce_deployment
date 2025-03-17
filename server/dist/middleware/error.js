import mongoose from 'mongoose';
export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "some Error Occured";
    err.statusCode = err.statusCode || 500;
    if (err instanceof mongoose.Error.CastError) {
        err.statusCode = 400; // Bad Request
        err.message = `Invalid ID format: ${err.value}`;
    }
    return res.status(err.statusCode).json({
        success: false, // It should be false since it's an error response
        message: err.message,
    });
};
export const TryCatch = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
