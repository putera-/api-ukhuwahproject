-- AlterTable
ALTER TABLE `Auth` MODIFY `expiredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Client` ADD COLUMN `bank_account_no` VARCHAR(30) NULL AFTER `twitter`,
    ADD COLUMN `bank_holder_name` VARCHAR(100) NULL AFTER `bank_account_no`,
    ADD COLUMN `bank_name` VARCHAR(100) NULL AFTER `bank_holder_name`;
