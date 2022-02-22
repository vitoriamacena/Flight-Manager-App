-- CreateTable
CREATE TABLE "_AddOnToBooking" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AddOnToBooking_AB_unique" ON "_AddOnToBooking"("A", "B");

-- CreateIndex
CREATE INDEX "_AddOnToBooking_B_index" ON "_AddOnToBooking"("B");

-- AddForeignKey
ALTER TABLE "_AddOnToBooking" ADD FOREIGN KEY ("A") REFERENCES "addon"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddOnToBooking" ADD FOREIGN KEY ("B") REFERENCES "booking"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
