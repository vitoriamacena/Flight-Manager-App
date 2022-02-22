/*
  Warnings:

  - You are about to drop the `_AddOnToFlight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AddOnToFlight" DROP CONSTRAINT "_AddOnToFlight_A_fkey";

-- DropForeignKey
ALTER TABLE "_AddOnToFlight" DROP CONSTRAINT "_AddOnToFlight_B_fkey";

-- DropTable
DROP TABLE "_AddOnToFlight";
