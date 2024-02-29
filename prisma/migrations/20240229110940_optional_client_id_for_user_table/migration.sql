-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_clientId_fkey`;

-- AlterTable
ALTER TABLE `user` MODIFY `clientId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
