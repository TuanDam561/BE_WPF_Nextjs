import { AppError } from "@shared/appError";
import { ApiResponse } from "@shared/apiRespone";

export function handleError(error: unknown) {
    if (error instanceof AppError) {
        return Response.json(
            ApiResponse.error(error.message, error.errorCode),
            { status: error.statusCode }
        );
    }

    console.error("Unexpected Error:", error);

    return Response.json(
        ApiResponse.error(
            "Lỗi hệ thống",
            "INTERNAL_SERVER_ERROR"
        ),
        { status: 500 }
    );
}