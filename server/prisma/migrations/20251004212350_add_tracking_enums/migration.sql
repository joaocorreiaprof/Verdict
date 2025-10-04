-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('MOVIE', 'SERIES', 'BOOK', 'GAME');

-- CreateEnum
CREATE TYPE "TrackingStatus" AS ENUM ('NOT_SEEN', 'SEEN');

-- CreateTable
CREATE TABLE "UserTrackedItem" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "itemId" TEXT NOT NULL,
    "itemType" "ItemType" NOT NULL,
    "status" "TrackingStatus" NOT NULL DEFAULT 'NOT_SEEN',
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserTrackedItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserTrackedItem_userId_itemId_itemType_key" ON "UserTrackedItem"("userId", "itemId", "itemType");

-- AddForeignKey
ALTER TABLE "UserTrackedItem" ADD CONSTRAINT "UserTrackedItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
