-- CreateTable
CREATE TABLE "AuthorizedAdmin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "AuthorizedAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorizedAdmin_email_key" ON "AuthorizedAdmin"("email");
