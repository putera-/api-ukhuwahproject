/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `Auth` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `imam_qiamul_lail_id` on the `ItikafSchedule` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ItikafSchedule` DROP FOREIGN KEY `ItikafSchedule_imam_qiamul_lail_id_fkey`;

-- AlterTable
ALTER TABLE `Auth` MODIFY `expiredAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `ItikafSchedule` DROP COLUMN `imam_qiamul_lail_id`,
    ADD COLUMN `imam_qiyamul_lail_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ItikafSchedule` ADD CONSTRAINT `ItikafSchedule_imam_qiyamul_lail_id_fkey` FOREIGN KEY (`imam_qiyamul_lail_id`) REFERENCES `Asaatidz`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
