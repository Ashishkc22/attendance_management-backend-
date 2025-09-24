/*
  Warnings:

  - The primary key for the `Department` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createAt` on the `userProfile` table. All the data in the column will be lost.
  - You are about to drop the column `department` on the `userProfile` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `userProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."classDetails" DROP CONSTRAINT "classDetails_departmentId_fkey";

-- AlterTable
ALTER TABLE "public"."Department" DROP CONSTRAINT "Department_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Department_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Department_id_seq";

-- AlterTable
ALTER TABLE "public"."classDetails" ALTER COLUMN "departmentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."userProfile" DROP COLUMN "createAt",
DROP COLUMN "department",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "departmentId" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Inactives',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "public"."userProfile" ADD CONSTRAINT "userProfile_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."classDetails" ADD CONSTRAINT "classDetails_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
