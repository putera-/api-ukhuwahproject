-- AlterTable
ALTER TABLE `Article` ADD COLUMN `youtubeId` VARCHAR(100) NULL AFTER `authorId`,
    MODIFY `content` TEXT NULL;
