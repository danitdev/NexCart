-- AlterTable
ALTER TABLE `user` ADD COLUMN `passwordResetExpiresAt` DATETIME(3) NULL,
    ADD COLUMN `passwordResetToken` VARCHAR(191) NULL;
