/*
  Warnings:

  - You are about to drop the column `roomId` on the `amenitie` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `room` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `room` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `floor` to the `room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomTypeId` to the `room` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `amenitie_roomId_fkey` ON `amenitie`;

-- DropIndex
DROP INDEX `Room_hotelCenterId_fkey` ON `room`;

-- AlterTable
ALTER TABLE `amenitie` DROP COLUMN `roomId`;

-- AlterTable
ALTER TABLE `hotelcenter` ADD COLUMN `cellPhone` VARCHAR(191) NULL,
    ADD COLUMN `garage` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `phone` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `category`,
    DROP COLUMN `name`,
    ADD COLUMN `floor` INTEGER NOT NULL,
    ADD COLUMN `roomTypeId` VARCHAR(191) NOT NULL,
    MODIFY `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `image`;

-- DropTable
DROP TABLE `category`;

-- CreateTable
CREATE TABLE `roomtype` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `roomtype_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `hotelCenterId` VARCHAR(191) NULL,
    `roomId` VARCHAR(191) NULL,
    `public_id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,

    UNIQUE INDEX `image_url_key`(`url`),
    UNIQUE INDEX `image_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_amenitietoroom` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    INDEX `_amenitieToroom_B_index`(`B`),
    UNIQUE INDEX `_amenitieToroom_AB_unique`(`A`, `B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Service_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking` (
    `id` VARCHAR(191) NOT NULL,
    `checkIn` DATETIME(3) NOT NULL,
    `checkOut` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_bookingtoroom` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    INDEX `_bookingToroom_B_index`(`B`),
    UNIQUE INDEX `_bookingToroom_AB_unique`(`A`, `B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_amenitieToroom` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_amenitieToroom_AB_unique`(`A`, `B`),
    INDEX `_amenitieToroom_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_bookingToroom` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_bookingToroom_AB_unique`(`A`, `B`),
    INDEX `_bookingToroom_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
