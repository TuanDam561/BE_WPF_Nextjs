import { FeedBackController } from "@/controllers/feedbackController";
import { handleError } from "@/shared/handleError";

// POST /api/feedback
export async function POST(req: Request) {
    try {
        return await FeedBackController.create(req);
    } catch (error) {
        return handleError(error);
    }
}

// GET /api/feedback
export async function GET() {
    try {
        return await FeedBackController.getAll();
    } catch (error) {
        return handleError(error);
    }
}