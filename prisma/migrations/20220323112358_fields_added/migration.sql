/*
  Warnings:

  - You are about to drop the column `lastConnected` on the `devices` table. All the data in the column will be lost.
  - You are about to drop the column `energy` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `subscription` on the `users` table. All the data in the column will be lost.
  - Added the required column `port` to the `controls` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionPlan" AS ENUM ('NONE', 'PREMIUM', 'PREMIUM_PRO', 'PREMIUM_PRO_PLUS');

-- CreateEnum
CREATE TYPE "TodoState" AS ENUM ('ACTIVE', 'COMPLETE');

-- AlterTable
ALTER TABLE "controls" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "port" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "devices" DROP COLUMN "lastConnected",
ADD COLUMN     "lastSeen" TIMESTAMP(3),
ADD COLUMN     "microcontrollerName" TEXT,
ADD COLUMN     "notifyAfter" INTEGER;

-- AlterTable
ALTER TABLE "displays" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "backgroundImageUrl" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "energy",
DROP COLUMN "subscription",
ADD COLUMN     "subscriptionPlan" "SubscriptionPlan" NOT NULL DEFAULT E'NONE';

-- DropEnum
DROP TYPE "Subscription";

-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "state" "TodoState" NOT NULL DEFAULT E'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Friends" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SharedProjects" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Friends_AB_unique" ON "_Friends"("A", "B");

-- CreateIndex
CREATE INDEX "_Friends_B_index" ON "_Friends"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SharedProjects_AB_unique" ON "_SharedProjects"("A", "B");

-- CreateIndex
CREATE INDEX "_SharedProjects_B_index" ON "_SharedProjects"("B");

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Friends" ADD FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Friends" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedProjects" ADD FOREIGN KEY ("A") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharedProjects" ADD FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
