/*
  Warnings:

  - A unique constraint covering the columns `[supertokenId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `supertokenId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "supertokenId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_supertokenId_key" ON "users"("supertokenId");
