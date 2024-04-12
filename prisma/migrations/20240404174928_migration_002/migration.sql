/*
  Warnings:

  - Made the column `roomId` on table `amenitie` required. This step will fail if there are existing NULL values in that column.
  - Made the column `hotelCenterId` on table `room` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `amenitie` DROP FOREIGN KEY `amenitie_roomId_fkey`;

-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `room_hotelCenterId_fkey`;

-- AlterTable
ALTER TABLE `amenitie` MODIFY `roomId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `room` MODIFY `hotelCenterId` VARCHAR(191) NOT NULL;
