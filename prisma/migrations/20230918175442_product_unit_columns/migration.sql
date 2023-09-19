/*
  Warnings:

  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code1` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price1` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit1` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "price",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "code1" TEXT NOT NULL,
ADD COLUMN     "code2" TEXT,
ADD COLUMN     "code3" TEXT,
ADD COLUMN     "code4" TEXT,
ADD COLUMN     "code5" TEXT,
ADD COLUMN     "price1" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price2" DOUBLE PRECISION,
ADD COLUMN     "price3" DOUBLE PRECISION,
ADD COLUMN     "price4" DOUBLE PRECISION,
ADD COLUMN     "price5" DOUBLE PRECISION,
ADD COLUMN     "unit1" TEXT NOT NULL,
ADD COLUMN     "unit2" TEXT,
ADD COLUMN     "unit3" TEXT,
ADD COLUMN     "unit4" TEXT,
ADD COLUMN     "unit5" TEXT;
