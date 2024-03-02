/*
  Warnings:

  - You are about to drop the column `token` on the `auth` table. All the data in the column will be lost.
  - Added the required column `access_token` to the `Auth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exp` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `auth` DROP COLUMN `token`,
    ADD COLUMN `access_token` VARCHAR(200) NOT NULL,
    ADD COLUMN `exp` INTEGER NOT NULL;
