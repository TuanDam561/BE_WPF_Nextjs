export class ApiResponse<T> {
    public success: boolean;
    public message: string;
    public data?: T | undefined;

    constructor(success: boolean, message: string, data?: T) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success<T>(message: string, data?: T): ApiResponse<T> {
        return new ApiResponse<T>(true, message, data);
    }

    static error(message: string): ApiResponse<null> {
        return new ApiResponse<null>(false, message);
    }
}