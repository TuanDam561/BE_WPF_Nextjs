// ===============================
// CREATE PAYLOAD
// ===============================
export type CreateFeedbackPayload = {
    email: string;
    userName: string;
    content: string;
    images?: string[];
};

// ===============================
// RESPONSE
// ===============================
export type CreateFeedbackResponse = {
    message: string;
    feedbackId: string;
    userId: string;
};