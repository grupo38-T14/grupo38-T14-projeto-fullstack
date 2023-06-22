-- DropForeignKey
ALTER TABLE "advert" DROP CONSTRAINT "advert_userId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_advertId_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_userId_fkey";

-- DropForeignKey
ALTER TABLE "gallery" DROP CONSTRAINT "gallery_advertId_fkey";

-- AddForeignKey
ALTER TABLE "advert" ADD CONSTRAINT "advert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_advertId_fkey" FOREIGN KEY ("advertId") REFERENCES "advert"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery" ADD CONSTRAINT "gallery_advertId_fkey" FOREIGN KEY ("advertId") REFERENCES "advert"("id") ON DELETE CASCADE ON UPDATE CASCADE;
