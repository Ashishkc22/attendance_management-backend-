-- AlterTable
ALTER TABLE "public"."userProfile" ADD COLUMN     "classId" TEXT;

-- CreateTable
CREATE TABLE "public"."classDetails" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "classDetails_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."userProfile" ADD CONSTRAINT "userProfile_classId_fkey" FOREIGN KEY ("classId") REFERENCES "public"."classDetails"("id") ON DELETE SET NULL ON UPDATE CASCADE;
