/*
  Warnings:

  - You are about to drop the column `availableSeats` on the `flight` table. All the data in the column will be lost.
  - You are about to drop the column `seats` on the `flight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flight" DROP COLUMN "availableSeats",
DROP COLUMN "seats";
