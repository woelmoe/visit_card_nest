/*
  Warnings:

  - You are about to drop the column `company` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Experience` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Experience_company_idx";

-- DropIndex
DROP INDEX "Experience_position_idx";

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "company",
DROP COLUMN "position",
ADD COLUMN     "employmentId" TEXT;

-- CreateTable
CREATE TABLE "Employment" (
    "id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "company" TEXT NOT NULL,

    CONSTRAINT "Employment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Experience_employmentId_idx" ON "Experience"("employmentId");

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_employmentId_fkey" FOREIGN KEY ("employmentId") REFERENCES "Employment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
