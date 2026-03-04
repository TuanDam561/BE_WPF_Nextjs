-- CreateTable
CREATE TABLE "User_FeedBack" (
    "UserId" UUID NOT NULL,
    "Email" VARCHAR(255) NOT NULL,
    "Name" VARCHAR(255),
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_FeedBack_pkey" PRIMARY KEY ("UserId")
);

-- CreateTable
CREATE TABLE "FeedBack" (
    "Id" UUID NOT NULL,
    "UserId" UUID NOT NULL,
    "Content" TEXT NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeedBack_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Image" (
    "Image_Id" UUID NOT NULL,
    "Url_Image" VARCHAR(255) NOT NULL,
    "Create_Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_Date" TIMESTAMP(3) NOT NULL,
    "FeedBackId" UUID NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("Image_Id")
);

-- CreateTable
CREATE TABLE "Version_Notify" (
    "VerId" UUID NOT NULL,
    "Version" VARCHAR(255) NOT NULL,
    "Title" VARCHAR(255) NOT NULL,
    "Content" TEXT NOT NULL,
    "Date_Release" TIMESTAMP(3) NOT NULL,
    "Expired" TIMESTAMP(3) NOT NULL,
    "Is_Expried" BOOLEAN NOT NULL,
    "Create_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Update_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Version_Notify_pkey" PRIMARY KEY ("VerId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_FeedBack_Email_key" ON "User_FeedBack"("Email");

-- AddForeignKey
ALTER TABLE "FeedBack" ADD CONSTRAINT "FeedBack_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User_FeedBack"("UserId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_FeedBackId_fkey" FOREIGN KEY ("FeedBackId") REFERENCES "FeedBack"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
