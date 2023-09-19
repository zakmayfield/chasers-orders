/*
  Warnings:

  - You are about to drop the column `code1` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `code2` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `code3` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `code4` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `code5` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price1` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price2` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price3` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price4` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price5` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unit1` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unit2` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unit3` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unit4` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `unit5` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "code1",
DROP COLUMN "code2",
DROP COLUMN "code3",
DROP COLUMN "code4",
DROP COLUMN "code5",
DROP COLUMN "price1",
DROP COLUMN "price2",
DROP COLUMN "price3",
DROP COLUMN "price4",
DROP COLUMN "price5",
DROP COLUMN "unit1",
DROP COLUMN "unit2",
DROP COLUMN "unit3",
DROP COLUMN "unit4",
DROP COLUMN "unit5";

-- CreateTable
CREATE TABLE "Unit" (
    "id" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "code" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Unit" ADD CONSTRAINT "Unit_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
