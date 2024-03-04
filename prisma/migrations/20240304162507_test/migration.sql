/*
  Warnings:

  - Made the column `status` on table `blog` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `blog` MODIFY `status` ENUM('DRAFT', 'PUBLISH') NOT NULL DEFAULT 'DRAFT';
