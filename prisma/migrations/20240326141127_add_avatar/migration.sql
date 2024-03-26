/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `Auth` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Asaatidz` ADD COLUMN `avatar` VARCHAR(255) NULL,
    ADD COLUMN `avatar_md` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `Auth` MODIFY `expiredAt` TIMESTAMP NOT NULL;
