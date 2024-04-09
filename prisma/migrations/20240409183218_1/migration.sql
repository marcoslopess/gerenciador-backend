-- CreateTable
CREATE TABLE `FinancialRecord` (
    `id` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `formPayment` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `typeFinance` VARCHAR(191) NOT NULL,
    `dateCreate` DATETIME(3) NOT NULL,
    `dateUpdate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
