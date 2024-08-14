/*
  Warnings:

  - You are about to drop the column `juiceId` on the `Favorite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,productId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_juiceId_fkey";

-- DropIndex
DROP INDEX "Favorite_userId_juiceId_key";

-- AlterTable
ALTER TABLE "Favorite" DROP COLUMN "juiceId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_productId_key" ON "Favorite"("userId", "productId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
