/*
  Warnings:

  - Made the column `image_cape` on table `advert` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "advert" ALTER COLUMN "image_cape" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "avatar_url" DROP NOT NULL;
