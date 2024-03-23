/*
  Warnings:

  - You are about to drop the column `publishAt` on the `Article` table. All the data in the column will be lost.
  - You are about to alter the column `expiredAt` on the `Auth` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `Article` DROP COLUMN `publishAt`,
    ADD COLUMN `publishedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Auth` MODIFY `expiredAt` TIMESTAMP NOT NULL;
