/*
  Warnings:

  - The `updateInterval` column on the `displays` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "displays" DROP COLUMN "updateInterval",
ADD COLUMN     "updateInterval" INTEGER NOT NULL DEFAULT 1;
