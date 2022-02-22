/*
  Warnings:

  - You are about to drop the column `flightNumber` on the `flight` table. All the data in the column will be lost.
  - Added the required column `availableSeats` to the `flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "flight" DROP COLUMN "flightNumber",
ADD COLUMN     "availableSeats" INTEGER NOT NULL;
