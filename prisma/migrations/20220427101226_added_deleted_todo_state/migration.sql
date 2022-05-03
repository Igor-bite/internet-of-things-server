/*
  Warnings:

  - The values [COMPLETE] on the enum `TodoState` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TodoState_new" AS ENUM ('ACTIVE', 'COMPLETED', 'DELETED');
ALTER TABLE "todos" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "todos" ALTER COLUMN "state" TYPE "TodoState_new" USING ("state"::text::"TodoState_new");
ALTER TYPE "TodoState" RENAME TO "TodoState_old";
ALTER TYPE "TodoState_new" RENAME TO "TodoState";
DROP TYPE "TodoState_old";
ALTER TABLE "todos" ALTER COLUMN "state" SET DEFAULT 'ACTIVE';
COMMIT;
