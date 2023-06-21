/*
  Warnings:

  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "address" DROP CONSTRAINT "address_userId_fkey";

-- DropTable
DROP TABLE "address";

-- CreateTable
CREATE TABLE "add" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT DEFAULT 'none',
    "created_at" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "add_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "add_userId_key" ON "add"("userId");

-- AddForeignKey
ALTER TABLE "add" ADD CONSTRAINT "add_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
