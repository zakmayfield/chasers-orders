/*
  Warnings:

  - Added the required column `quantity` to the `OrderLineItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderLineItem" ADD COLUMN     "quantity" INTEGER NOT NULL;
