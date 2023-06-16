-- AlterTable
ALTER TABLE "address" ALTER COLUMN "complement" DROP NOT NULL,
ALTER COLUMN "complement" SET DEFAULT 'none';

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "created_at" DROP DEFAULT,
ALTER COLUMN "created_at" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_at" DROP DEFAULT,
ALTER COLUMN "created_at" SET DATA TYPE TEXT;
