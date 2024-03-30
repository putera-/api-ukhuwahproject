-- CreateTable
CREATE TABLE `Client` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `nick` VARCHAR(20) NOT NULL,
    `slogan` VARCHAR(255) NULL,
    `address` TEXT NULL,
    `phone` VARCHAR(20) NULL,
    `logo` VARCHAR(100) NULL,
    `logo_sm` VARCHAR(100) NULL,
    `youtube` VARCHAR(100) NULL,
    `instagram` VARCHAR(100) NULL,
    `facebook` VARCHAR(100) NULL,
    `twitter` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Slide` (
    `id` VARCHAR(191) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `role` ENUM('SUPERUSER', 'ADMIN', 'STAFF', 'MEMBER') NOT NULL DEFAULT 'MEMBER',
    `avatar` VARCHAR(255) NULL,
    `avatar_md` VARCHAR(255) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Auth` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `token` VARCHAR(300) NOT NULL,
    `expiredAt` TIMESTAMP NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `method` VARCHAR(10) NOT NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `content` TEXT NOT NULL,
    `authorId` VARCHAR(191) NOT NULL,
    `status` ENUM('DRAFT', 'PUBLISH') NOT NULL DEFAULT 'DRAFT',
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `publishedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Article_title_idx`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Photo` (
    `id` VARCHAR(191) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `path_md` VARCHAR(255) NOT NULL,
    `index` INTEGER NOT NULL DEFAULT 0,
    `articleId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Itikaf` (
    `id` VARCHAR(191) NOT NULL,
    `year` VARCHAR(4) NOT NULL,
    `hijri_year` VARCHAR(4) NOT NULL,
    `description` TEXT NOT NULL,
    `photo` VARCHAR(255) NULL,
    `photo_sm` VARCHAR(255) NULL,
    `masjid` VARCHAR(100) NULL,
    `address` TEXT NULL,
    `contact_person_name` VARCHAR(100) NULL,
    `contact_person_phone` VARCHAR(20) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Itikaf_hijri_year_key`(`hijri_year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItikafSchedule` (
    `id` VARCHAR(191) NOT NULL,
    `itikafId` VARCHAR(191) NOT NULL,
    `date` VARCHAR(10) NOT NULL,
    `day_index` TINYINT NOT NULL,
    `description` TEXT NOT NULL,
    `photo` VARCHAR(255) NULL,
    `photo_sm` VARCHAR(255) NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `imam_tarawih_id` VARCHAR(191) NULL,
    `imam_qiyamul_lail_id` VARCHAR(191) NULL,
    `ustadz_kajian_id` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItikafParticipant` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `scheduleId` VARCHAR(191) NOT NULL,
    `total_member` TINYINT NOT NULL,
    `man` TINYINT NOT NULL,
    `woman` TINYINT NOT NULL,
    `vehicleId` VARCHAR(191) NULL,
    `participate` BOOLEAN NOT NULL DEFAULT true,
    `unparticipate_reason` TEXT NULL,
    `coupon_taken` BOOLEAN NOT NULL DEFAULT false,
    `attendance_check` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vehicle` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `vehicle_type` ENUM('Motor', 'Mobil') NULL,
    `vehicle_no` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Asaatidz` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `profile` TEXT NOT NULL,
    `avatar` VARCHAR(255) NULL,
    `avatar_md` VARCHAR(255) NULL,
    `deleted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Auth` ADD CONSTRAINT `Auth_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_articleId_fkey` FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Itikaf` ADD CONSTRAINT `Itikaf_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItikafSchedule` ADD CONSTRAINT `ItikafSchedule_itikafId_fkey` FOREIGN KEY (`itikafId`) REFERENCES `Itikaf`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItikafSchedule` ADD CONSTRAINT `ItikafSchedule_imam_tarawih_id_fkey` FOREIGN KEY (`imam_tarawih_id`) REFERENCES `Asaatidz`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItikafSchedule` ADD CONSTRAINT `ItikafSchedule_imam_qiyamul_lail_id_fkey` FOREIGN KEY (`imam_qiyamul_lail_id`) REFERENCES `Asaatidz`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItikafSchedule` ADD CONSTRAINT `ItikafSchedule_ustadz_kajian_id_fkey` FOREIGN KEY (`ustadz_kajian_id`) REFERENCES `Asaatidz`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItikafParticipant` ADD CONSTRAINT `ItikafParticipant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItikafParticipant` ADD CONSTRAINT `ItikafParticipant_scheduleId_fkey` FOREIGN KEY (`scheduleId`) REFERENCES `ItikafSchedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItikafParticipant` ADD CONSTRAINT `ItikafParticipant_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vehicle` ADD CONSTRAINT `Vehicle_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
