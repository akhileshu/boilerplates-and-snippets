-- AlterTable
ALTER TABLE "users" ADD COLUMN     "totalPostsCreated" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalPostsUpdated" INTEGER NOT NULL DEFAULT 0;
