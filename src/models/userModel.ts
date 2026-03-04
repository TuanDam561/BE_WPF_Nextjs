import { prisma } from "@lib/prisma";
import { Prisma, User_FeedBack } from "@generated/prisma/client";

export class UserModel {
    // CREATE
    static async create(
        data: Prisma.User_FeedBackCreateInput
    ): Promise<User_FeedBack> {
        return prisma.user_FeedBack.create({
            data,
        });
    }

    // GET ALL
    static async findAll(): Promise<User_FeedBack[]> {
        return prisma.user_FeedBack.findMany({
            orderBy: {
                Create_Date: "desc",
            },
        });
    }

    // GET BY EMAIL
    static async findByEmail(
        email: string
    ): Promise<User_FeedBack | null> {
        return prisma.user_FeedBack.findUnique({
            where: { Email: email },
        });
    }

    // GET BY ID
    static async findById(
        userId: string
    ): Promise<User_FeedBack | null> {
        return prisma.user_FeedBack.findUnique({
            where: { UserId: userId },
        });
    }

    // UPDATE
    static async update(
        userId: string,
        data: Prisma.User_FeedBackUpdateInput
    ): Promise<User_FeedBack> {
        return prisma.user_FeedBack.update({
            where: { UserId: userId },
            data,
        });
    }

    // DELETE
    static async delete(userId: string): Promise<User_FeedBack> {
        return prisma.user_FeedBack.delete({
            where: { UserId: userId },
        });
    }
}