-- CreateTable
CREATE TABLE "flight" (
    "ID" TEXT NOT NULL,
    "flightNumber" INTEGER NOT NULL,
    "departure" TEXT NOT NULL,
    "arrival" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "Seats" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userID" TEXT,

    CONSTRAINT "flight_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "flight_flightNumber_key" ON "flight"("flightNumber");

-- AddForeignKey
ALTER TABLE "flight" ADD CONSTRAINT "flight_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
