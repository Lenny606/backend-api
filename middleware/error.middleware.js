const errorMiddleware = (err, req, res, next) => {
    try {
        let error = {...err}

        error.message = err.message
        console.error(err)

        if (err.name === "CastError") {
            const message = "Resource not found"
            error = new Error(message)
            error.status = 404;
        }
        if (err.code === 11000) {
            const message = "Duplicate key"
            error = new Error(message)
            error.status = 400;
        }
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(val => val.message);
            const message = `Validation error: ${messages.join(', ')}`;
            error = new Error(message);
            error.status = 400;
        }
        res.status(error.status || 500).json({
            success: false,
            message: error.message || 'Server Error'
        });
    } catch (err) {
        next(err)
    }

}