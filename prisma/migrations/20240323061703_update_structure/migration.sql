/*
  Warnings:

  - You are about to drop the column `access_token` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `exp` on the `Auth` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `User` table. All the data in the column will be lost.
  - Added the required column `expiredAt` to the `Auth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method` to the `Auth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Auth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `Auth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nick` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Auth` DROP COLUMN `access_token`,
    DROP COLUMN `exp`,
    ADD COLUMN `expiredAt` TIMESTAMP NOT NULL,
    ADD COLUMN `method` VARCHAR(10) NOT NULL,
    ADD COLUMN `path` VARCHAR(255) NOT NULL,
    ADD COLUMN `token` VARCHAR(300) NOT NULL;

-- AlterTable
ALTER TABLE `Client` ADD COLUMN `address` TEXT NULL,
    ADD COLUMN `facebook` VARCHAR(100) NULL,
    ADD COLUMN `instagram` VARCHAR(100) NULL,
    ADD COLUMN `logo` VARCHAR(100) NULL,
    ADD COLUMN `nick` VARCHAR(20) NOT NULL,
    ADD COLUMN `phone` VARCHAR(20) NULL,
    ADD COLUMN `slogan` VARCHAR(255) NULL,
    ADD COLUMN `twitter` VARCHAR(100) NULL,
    ADD COLUMN `youtube` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `deleted`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;
