import { FeedBackService } from "@/services/feedbackService";
import { ApiResponse } from "@shared/apiRespone";

export class FeedBackController {
    // =========================
    // CREATE FEEDBACK
    // =========================
    static async create(req: Request) {
        const body = await req.json();

        const result = await FeedBackService.createFeedback(body);

        return Response.json(
            ApiResponse.success("Gửi phản hồi thành công", result),
            { status: 201 }
        );
    }

    // =========================
    // GET ALL
    // =========================
    static async getAll() {
        const data = await FeedBackService.getAllFeedbacks();

        return Response.json(
            ApiResponse.success("Lấy danh sách feedback thành công", data),
            { status: 200 }
        );
    }

    // =========================
    // GET BY ID
    // =========================
    static async getById(id: string) {
        const feedback = await FeedBackService.getFeedbackById(id);

        return Response.json(
            ApiResponse.success("Lấy feedback thành công", feedback),
            { status: 200 }
        );
    }

    // =========================
    // DELETE
    // =========================
    static async delete(id: string) {
        await FeedBackService.deleteFeedback(id);

        return Response.json(
            ApiResponse.success("Xóa feedback thành công"),
            { status: 200 }
        );
    }
}