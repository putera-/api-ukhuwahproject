/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `Auth` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `itikafScheduleId` on the `ItikafParticipant` table. All the data in the column will be lost.
  - Added the required column `scheduleId` to the `ItikafParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ItikafParticipant` DROP FOREIGN KEY `ItikafParticipant_itikafScheduleId_fkey`;

-- AlterTable
ALTER TABLE `Auth` MODIFY `expiredAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `ItikafParticipant` DROP COLUMN `itikafScheduleId`,
    ADD COLUMN `scheduleId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `ItikafParticipant` ADD CONSTRAINT `ItikafParticipant_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `ItikafSchedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
