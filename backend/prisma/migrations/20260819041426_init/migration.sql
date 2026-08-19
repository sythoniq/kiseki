/*
  Warnings:

  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Comment` table. All the data in the column will be lost.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Post` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_content` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `author_id` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_content` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_title` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_hash` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
DROP COLUMN "authorId",
DROP COLUMN "content",
DROP COLUMN "id",
DROP COLUMN "postId",
ADD COLUMN     "author_id" INTEGER NOT NULL,
ADD COLUMN     "comment_content" TEXT NOT NULL,
ADD COLUMN     "comment_id" SERIAL NOT NULL,
ADD COLUMN     "post_id" INTEGER NOT NULL,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("comment_id");

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
DROP COLUMN "authorId",
DROP COLUMN "content",
DROP COLUMN "id",
DROP COLUMN "title",
ADD COLUMN     "author_id" INTEGER NOT NULL,
ADD COLUMN     "post_content" TEXT NOT NULL,
ADD COLUMN     "post_id" SERIAL NOT NULL,
ADD COLUMN     "post_title" TEXT NOT NULL,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("post_id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "hash",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "user_hash" TEXT NOT NULL,
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD COLUMN     "user_name" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_name_key" ON "User"("user_name");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;
