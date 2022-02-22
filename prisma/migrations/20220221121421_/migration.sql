-- CreateTable
CREATE TABLE "addon" (
    "ID" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "addon_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "_AddOnToFlight" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AddOnToFlight_AB_unique" ON "_AddOnToFlight"("A", "B");

-- CreateIndex
CREATE INDEX "_AddOnToFlight_B_index" ON "_AddOnToFlight"("B");

-- AddForeignKey
ALTER TABLE "_AddOnToFlight" ADD FOREIGN KEY ("A") REFERENCES "addon"("ID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddOnToFlight" ADD FOREIGN KEY ("B") REFERENCES "flight"("ID") ON DELETE CASCADE ON UPDATE CASCADE;
