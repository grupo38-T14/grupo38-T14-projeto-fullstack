-- CreateEnum
CREATE TYPE "Fuel" AS ENUM ('ELECTRIC', 'ETHANOL', 'HYBRI');

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birth" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "account_type" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "advert" (
    "id" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "fuel" "Fuel" NOT NULL,
    "km" DECIMAL(65,30) NOT NULL,
    "color" TEXT NOT NULL,
    "table_fipe_price" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "image_cape" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "advert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "created_at" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "advertId" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "advertId" TEXT,

    CONSTRAINT "gallery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "address_userId_key" ON "address"("userId");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "advert" ADD CONSTRAINT "advert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_advertId_fkey" FOREIGN KEY ("advertId") REFERENCES "advert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery" ADD CONSTRAINT "gallery_advertId_fkey" FOREIGN KEY ("advertId") REFERENCES "advert"("id") ON DELETE SET NULL ON UPDATE CASCADE;
