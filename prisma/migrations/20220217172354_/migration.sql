-- DropIndex
DROP INDEX "flight_flightNumber_key";

-- AlterTable
ALTER TABLE "flight" ALTER COLUMN "flightNumber" SET DATA TYPE TEXT;
