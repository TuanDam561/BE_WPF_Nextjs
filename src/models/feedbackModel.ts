import { prisma } from "@/lib/prisma";
import { Prisma, FeedBack } from "@generated/prisma/client";

export class FeedBackModel {
    // CREATE
    static async create(
        data: Prisma.FeedBackCreateInput
    ): Promise<FeedBack> {
        return prisma.feedBack.create({
            data,
        });
    }

    // GET ALL
    static async findAll(): Promise<FeedBack[]> {
        return prisma.feedBack.findMany({
            include: {
                User: true,
                Images: true,
            },
            orderBy: {
                Create_Date: "desc",
            },
        });
    }

    // GET BY ID
    static async findById(id: string): Promise<FeedBack | null> {
        return prisma.feedBack.findUnique({
            where: { Id: id },
            include: {
                User: true,
                Images: true,
            },
        });
    }

    // DELETE
    static async delete(id: string): Promise<FeedBack> {
        return prisma.feedBack.delete({
            where: { Id: id },
        });
    }
}