import { prisma } from "@/lib/prisma";
import { Prisma, Version_Notify } from "@generated/prisma/client";

export class VersionNotifyModel {
    static async create(
        data: Prisma.Version_NotifyCreateInput
    ): Promise<Version_Notify> {
        return prisma.version_Notify.create({
            data,
        });
    }

    static async findAll(): Promise<Version_Notify[]> {
        return prisma.version_Notify.findMany({
            orderBy: {
                Date_Release: "desc",
            },
        });
    }

    static async findActive(): Promise<Version_Notify[]> {
        return prisma.version_Notify.findMany({
            where: {
                Is_Expried: false,
            },
        });
    }
}