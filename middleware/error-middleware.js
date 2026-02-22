

errorMiddleware =
    (err, req, resp, next) => {
        let errorResponse = {
            status: err?.status || 500,
            message: err?.message || "Internal Server Error"
        }
        resp.status(errorResponse.status).json(errorResponse);
    }


module.exports = errorMiddleware;  