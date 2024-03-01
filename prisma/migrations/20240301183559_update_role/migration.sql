/*
  Warnings:

  - You are about to drop the column `userId` on the `blog` table. All the data in the column will be lost.
  - The values [SUPERADMIN,CLIENT] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `authorId` to the `blog` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `blog_userId_fkey`;

-- AlterTable
ALTER TABLE `blog` DROP COLUMN `userId`,
    ADD COLUMN `authorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('SUPERUSER', 'ADMIN', 'MEMBER') NOT NULL DEFAULT 'MEMBER';

-- AddForeignKey
ALTER TABLE `blog` ADD CONSTRAINT `blog_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
