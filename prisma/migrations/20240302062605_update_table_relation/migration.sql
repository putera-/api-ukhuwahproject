/*
  Warnings:

  - You are about to drop the column `clientId` on the `blog` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `blog_clientId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_clientId_fkey`;

-- AlterTable
ALTER TABLE `blog` DROP COLUMN `clientId`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `clientId`;
