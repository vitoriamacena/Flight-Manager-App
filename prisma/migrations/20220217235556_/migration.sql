-- CreateTable
CREATE TABLE "booking" (
    "ID" TEXT NOT NULL,
    "flightDate" TIMESTAMP(3) NOT NULL,
    "ticketNumber" TEXT NOT NULL,
    "userID" TEXT,
    "flightID" TEXT,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("ID")
);

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("ID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_flightID_fkey" FOREIGN KEY ("flightID") REFERENCES "flight"("ID") ON DELETE SET NULL ON UPDATE CASCADE;
