-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `blog_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `blog` DROP FOREIGN KEY `blog_blogCategoryId_fkey`;

-- AlterTable
ALTER TABLE `blog` ADD COLUMN `publishAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `status` ENUM('DRAFT', 'PUBLISH') NULL DEFAULT 'DRAFT';

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Blog` ADD CONSTRAINT `Blog_blogCategoryId_fkey` FOREIGN KEY (`blogCategoryId`) REFERENCES `blog_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `blog` RENAME INDEX `blog_title_idx` TO `Blog_title_idx`;
