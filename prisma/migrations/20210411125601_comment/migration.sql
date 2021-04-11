-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "uid" INTEGER NOT NULL,
    "pid" INTEGER NOT NULL,
    "payload" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("uid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("pid") REFERENCES "Photo"("id") ON DELETE CASCADE ON UPDATE CASCADE;