/*
  Warnings:

  - The primary key for the `addon` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `icon` on the `addon` table. All the data in the column will be lost.
  - The `ID` column on the `addon` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[A,B]` on the table `_AddOnToFlight` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `A` on the `_AddOnToFlight` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_AddOnToFlight" DROP CONSTRAINT "_AddOnToFlight_A_fkey";

-- AlterTable
ALTER TABLE "_AddOnToFlight" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "addon" DROP CONSTRAINT "addon_pkey",
DROP COLUMN "icon",
DROP COLUMN "ID",
ADD COLUMN     "ID" SERIAL NOT NULL,
ADD CONSTRAINT "addon_pkey" PRIMARY KEY ("ID");

-- CreateIndex
CREATE UNIQUE INDEX "_AddOnToFlight_AB_unique" ON "_AddOnToFlight"("A", "B");

-- AddForeignKey
ALTER TABLE "_AddOnToFlight" ADD FOREIGN KEY ("A") REFERENCES "addon"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
