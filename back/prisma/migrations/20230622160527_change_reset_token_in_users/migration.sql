/*
  Warnings:

  - You are about to drop the column `resetToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "resetToken",
ADD COLUMN     "reset_token" TEXT;
