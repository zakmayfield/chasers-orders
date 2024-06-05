-- CreateTable
CREATE TABLE "CustomProduct" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "CustomProduct_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CustomProduct" ADD CONSTRAINT "CustomProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
