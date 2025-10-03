/*
  Warnings:

  - You are about to drop the column `userId` on the `userProfile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."userProfile_userId_key";

-- AlterTable
ALTER TABLE "public"."userProfile" DROP COLUMN "userId";
