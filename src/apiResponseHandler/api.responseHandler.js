class ResponseHandler {
    static success (res, statusCode, data) {
        res.status(statusCode).json({success: true, message: 'ok', data })
    }

    static error (res, statusCode, err) {
        res.status(statusCode).json({success: false, message: err, data: null })
    }
}

module.exports = ResponseHandler;