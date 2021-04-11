/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[pid,uid]` on the table `Like`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Like.pid_uid_unique" ON "Like"("pid", "uid");
