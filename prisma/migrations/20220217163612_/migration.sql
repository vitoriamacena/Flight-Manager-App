/*
  Warnings:

  - You are about to drop the column `Seats` on the `flight` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "flight" DROP COLUMN "Seats",
ADD COLUMN     "seats" TEXT[];
