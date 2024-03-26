/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `Auth` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Auth` MODIFY `expiredAt` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `ItikafSchedule` ADD COLUMN `imam_qiamul_lail_id` VARCHAR(191) NULL,
    ADD COLUMN `imam_tarawih_id` VARCHAR(191) NULL,
    ADD COLUMN `ustadz_kajian_id` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ItikafSchedule` ADD CONSTRAINT `ItikafSchedule_imam_tarawih_id_fkey` FOREIGN KEY (`imam_tarawih_id`) REFERENCES `Asaatidz`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItikafSchedule` ADD CONSTRAINT `ItikafSchedule_imam_qiamul_lail_id_fkey` FOREIGN KEY (`imam_qiamul_lail_id`) REFERENCES `Asaatidz`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItikafSchedule` ADD CONSTRAINT `ItikafSchedule_ustadz_kajian_id_fkey` FOREIGN KEY (`ustadz_kajian_id`) REFERENCES `Asaatidz`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
