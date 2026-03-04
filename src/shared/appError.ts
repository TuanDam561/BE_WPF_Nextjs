export class AppError extends Error {
    public statusCode: number;
    public errorCode?: string | undefined;

    constructor(message: string, statusCode = 400, errorCode?: string) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;

        // Giữ đúng stack trace
        Error.captureStackTrace(this, this.constructor);
    }

    // 400
    static badRequest(message = "Bad Request", errorCode?: string) {
        return new AppError(message, 400, errorCode);
    }

    // 401
    static unauthorized(
        message = "Email hoặc mật khẩu không đúng",
        errorCode = "UNAUTHORIZED"
    ) {
        return new AppError(message, 401, errorCode);
    }

    // 403
    static forbidden(
        message = "Bạn không có quyền truy cập",
        errorCode = "FORBIDDEN"
    ) {
        return new AppError(message, 403, errorCode);
    }

    // 404
    static notFound(
        message = "Tài nguyên không tồn tại",
        errorCode = "NOT_FOUND"
    ) {
        return new AppError(message, 404, errorCode);
    }

    // 409
    static conflict(message = "Dữ liệu đã tồn tại", errorCode = "CONFLICT") {
        return new AppError(message, 409, errorCode);
    }

    // 422
    static unprocessable(
        message = "Dữ liệu không hợp lệ",
        errorCode = "UNPROCESSABLE_ENTITY"
    ) {
        return new AppError(message, 422, errorCode);
    }

    // 500
    static internal(
        message = "Lỗi hệ thống",
        errorCode = "INTERNAL_SERVER_ERROR"
    ) {
        return new AppError(message, 500, errorCode);
    }
}