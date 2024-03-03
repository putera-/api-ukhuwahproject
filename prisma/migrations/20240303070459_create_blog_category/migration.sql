/*
  Warnings:

  - Added the required column `blogCategoryId` to the `blog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `blog` ADD COLUMN `blogCategoryId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `blog_category` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `blog` ADD CONSTRAINT `blog_blogCategoryId_fkey` FOREIGN KEY (`blogCategoryId`) REFERENCES `blog_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
