export class ApiResponse<T> {
    public success: boolean;
    public message: string;
    public data?: T;
    public errorCode?: string;

    constructor(
        success: boolean,
        message: string,
        data?: T,
        errorCode?: string
    ) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.errorCode = errorCode;
    }

    static success<T>(message: string, data?: T): ApiResponse<T> {
        return new ApiResponse<T>(true, message, data);
    }

    static error(
        message: string,
        errorCode?: string
    ): ApiResponse<null> {
        return new ApiResponse<null>(false, message, undefined, errorCode);
    }
}