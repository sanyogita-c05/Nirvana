import ApiError from "../utils/api-error.js";

const errorHandler = (err, req, res, next) => {

    console.error(err);

    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Invalid token",
        });
    }

    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Token expired",
        });
    }

    // Multer's own errors (file too large, too many files, unexpected
    // field name, etc.) come through as err.name === "MulterError".
    if (err.name === "MulterError") {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: err.message,
        });
    }

    // Our fileFilter in upload.middleware.js throws plain Error objects
    // (not ApiError) for unsupported file types — surface the real
    // message instead of masking it as a generic 500.
    if (
        typeof err.message === "string" &&
        (err.message.includes("images are allowed") ||
            err.message.includes("videos are allowed"))
    ) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: err.message,
        });
    }

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            statusCode: err.statusCode,
            message: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        statusCode: 500,
        message: "Internal Server Error",
    });
};

export default errorHandler;