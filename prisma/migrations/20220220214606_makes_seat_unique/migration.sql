/*
  Warnings:

  - A unique constraint covering the columns `[seats]` on the table `booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "booking_seats_key" ON "booking"("seats");
