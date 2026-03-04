import { prisma } from "@/lib/prisma";
import { Prisma, Image } from "@generated/prisma/client";

export class ImageModel {
    static async create(
        data: Prisma.ImageCreateInput
    ): Promise<Image> {
        return prisma.image.create({
            data,
        });
    }

    static async delete(imageId: string): Promise<Image> {
        return prisma.image.delete({
            where: { Image_Id: imageId },
        });
    }
}