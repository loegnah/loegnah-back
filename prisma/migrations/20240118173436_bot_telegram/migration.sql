-- CreateTable
CREATE TABLE `BotTelegram` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `chatId` BIGINT NOT NULL,

    UNIQUE INDEX `BotTelegram_name_key`(`name`),
    UNIQUE INDEX `BotTelegram_chatId_key`(`chatId`),
    INDEX `BotTelegram_name_idx`(`name`),
    INDEX `BotTelegram_chatId_idx`(`chatId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
