/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `Auth` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `itikafId` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `itikafScheduleId` on the `Photo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Photo` DROP FOREIGN KEY `Photo_itikafId_fkey`;

-- DropForeignKey
ALTER TABLE `Photo` DROP FOREIGN KEY `Photo_itikafScheduleId_fkey`;

-- AlterTable
ALTER TABLE `Auth` MODIFY `expiredAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Itikaf` ADD COLUMN `photo` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `ItikafSchedule` ADD COLUMN `photo` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `Photo` DROP COLUMN `itikafId`,
    DROP COLUMN `itikafScheduleId`;
