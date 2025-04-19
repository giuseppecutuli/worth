/*
  Warnings:

  - A unique constraint covering the columns `[iban]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "accounts_iban_key" ON "accounts"("iban");
