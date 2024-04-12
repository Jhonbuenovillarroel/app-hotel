-- AlterTable
ALTER TABLE `amenitie` MODIFY `roomId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `room` MODIFY `hotelCenterId` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `amenitie_roomId_fkey` ON `amenitie`(`roomId`);

-- CreateIndex
CREATE INDEX `Room_hotelCenterId_fkey` ON `room`(`hotelCenterId`);

-- AddForeignKey
ALTER TABLE `amenitie` ADD CONSTRAINT `amenitie_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `room`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room` ADD CONSTRAINT `room_hotelCenterId_fkey` FOREIGN KEY (`hotelCenterId`) REFERENCES `hotelcenter`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
