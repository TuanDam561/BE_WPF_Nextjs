import { UserModel } from "@/models/userModel";
import { FeedBackModel } from "@/models/feedbackModel";
import { ImageModel } from "@/models/imageModel";
import type { CreateFeedbackPayload, CreateFeedbackResponse } from "@/types/feedbackTypes";
import { AppError } from "@shared/appError";


export class FeedBackService {
    // ===============================
    // CREATE FEEDBACK
    // ===============================
    static async createFeedback(
        payload: CreateFeedbackPayload
    ): Promise<CreateFeedbackResponse> {
        const { email, userName, content, images = [] } = payload;

        if (!email || !userName || !content) {
            throw new AppError("Thiếu thông tin bắt buộc", 400, "BAD_REQUEST");
        }

        // 1️⃣ Tìm user theo email
        let user = await UserModel.findByEmail(email);

        // 2️⃣ Nếu chưa có thì tạo mới
        if (!user) {
            user = await UserModel.create({
                Email: email,
                Name: userName,
            });
        }

        // 3️⃣ Tạo feedback
        const feedback = await FeedBackModel.create({
            Content: content,
            User: {
                connect: {
                    UserId: user.UserId,
                },
            },
        });

        // 4️⃣ Xử lý ảnh (nếu có)
        if (images.length > 0) {
            for (const url of images) {
                await ImageModel.create({
                    Url_Image: url,
                    FeedBack: {
                        connect: {
                            Id: feedback.Id,
                        },
                    },
                });
            }
        }

        return {
            message: "Gửi phản hồi thành công",
            feedbackId: feedback.Id,
            userId: user.UserId,
        };
    }

    // ===============================
    // GET ALL
    // ===============================
    static async getAllFeedbacks() {
        return FeedBackModel.findAll();
    }

    // ===============================
    // GET BY ID
    // ===============================
    static async getFeedbackById(id: string) {
        const feedback = await FeedBackModel.findById(id);

        if (!feedback) {
            throw new AppError("Feedback không tồn tại", 404, "NOT_FOUND");
        }

        return feedback;
    }

    // ===============================
    // DELETE
    // ===============================
    static async deleteFeedback(id: string) {
        // nếu bạn chưa viết deleteByFeedBack trong ImageModel
        // thì có thể dùng prisma trực tiếp hoặc viết thêm method

        await FeedBackModel.delete(id);

        return { message: "Đã xóa feedback" };
    }
}