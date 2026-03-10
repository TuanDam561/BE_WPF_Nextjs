import { UserModel } from "@/models/userModel";
import { FeedBackModel } from "@/models/feedbackModel";
import { ImageModel } from "@/models/imageModel";
import type { CreateFeedbackPayload, CreateFeedbackResponse } from "@/types/feedbackTypes";
import { AppError } from "@shared/appError";
import cloudinary from "@/lib/cloudinary";

export class FeedBackService {

    static async createFeedback(
        payload: CreateFeedbackPayload
    ): Promise<CreateFeedbackResponse> {

        const { email, userName, content, images = [] } = payload;

        if (!email || !userName || !content) {
            throw new AppError("Thiếu thông tin bắt buộc", 400, "BAD_REQUEST");
        }

        // 1️⃣ tìm user
        let user = await UserModel.findByEmail(email);

        if (!user) {
            user = await UserModel.create({
                Email: email,
                Name: userName
            });
        }

        // 2️⃣ tạo feedback
        const feedback = await FeedBackModel.create({
            Content: content,
            User: {
                connect: {
                    UserId: user.UserId
                }
            }
        });

        // 3️⃣ upload ảnh lên Cloudinary
        let uploadedUrls: string[] = [];

        if (images.length > 0) {

            uploadedUrls = await Promise.all(
                images.map(async (base64) => {

                    const result = await cloudinary.uploader.upload(
                        `data:image/png;base64,${base64}`,
                        {
                            folder: "feedback",
                        }
                    );

                    return result.secure_url;
                })
            );
        }

        // 4️⃣ lưu DB
        if (uploadedUrls.length > 0) {

            await Promise.all(
                uploadedUrls.map((url) =>
                    ImageModel.create({
                        Url_Image: url,
                        FeedBack: {
                            connect: {
                                Id: feedback.Id
                            }
                        }
                    })
                )
            );
        }

        return {
            message: "Gửi phản hồi thành công",
            feedbackId: feedback.Id,
            userId: user.UserId
        };
    }

    static async getAllFeedbacks() {
        return FeedBackModel.findAll();
    }

    static async getFeedbackById(id: string) {

        const feedback = await FeedBackModel.findById(id);

        if (!feedback) {
            throw new AppError("Feedback không tồn tại", 404, "NOT_FOUND");
        }

        return feedback;
    }

    static async deleteFeedback(id: string) {

        await FeedBackModel.delete(id);

        return { message: "Đã xóa feedback" };
    }
}