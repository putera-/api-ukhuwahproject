/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `Auth` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Auth` MODIFY `expiredAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Photo` ADD COLUMN `itikafId` VARCHAR(191) NULL,
    ADD COLUMN `itikafScheduleId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Itikaf` (
    `id` VARCHAR(191) NOT NULL,
    `year` VARCHAR(4) NOT NULL,
    `hijri_year` VARCHAR(4) NOT NULL,
    `description` TEXT NOT NULL,
    `contact_person_name` VARCHAR(100) NOT NULL,
    `contact_person_phone` VARCHAR(20) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItikafSchedule` (
    `id` VARCHAR(191) NOT NULL,
    `itikafId` VARCHAR(191) NOT NULL,
    `date` DATE NOT NULL,
    `day_index` TINYINT NOT NULL,
    `description` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_itikafId_fkey` FOREIGN KEY (`itikafId`) REFERENCES `Itikaf`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_itikafScheduleId_fkey` FOREIGN KEY (`itikafScheduleId`) REFERENCES `ItikafSchedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Itikaf` ADD CONSTRAINT `Itikaf_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItikafSchedule` ADD CONSTRAINT `ItikafSchedule_itikafId_fkey` FOREIGN KEY (`itikafId`) REFERENCES `Itikaf`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
