/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `Auth` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- DropForeignKey
ALTER TABLE `ItikafParticipant` DROP FOREIGN KEY `ItikafParticipant_vehicleId_fkey`;

-- AlterTable
ALTER TABLE `Auth` MODIFY `expiredAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `ItikafParticipant` MODIFY `vehicleId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ItikafParticipant` ADD CONSTRAINT `ItikafParticipant_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
