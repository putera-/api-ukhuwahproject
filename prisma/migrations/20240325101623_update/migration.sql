/*
  Warnings:

  - You are about to alter the column `expiredAt` on the `Auth` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[year]` on the table `Itikaf` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hijri_year]` on the table `Itikaf` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Auth` MODIFY `expiredAt` TIMESTAMP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Itikaf_year_key` ON `Itikaf`(`year`);

-- CreateIndex
CREATE UNIQUE INDEX `Itikaf_hijri_year_key` ON `Itikaf`(`hijri_year`);
