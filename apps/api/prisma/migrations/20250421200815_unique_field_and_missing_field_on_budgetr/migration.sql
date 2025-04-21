/*
  Warnings:

  - A unique constraint covering the columns `[iban,user_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[symbol,user_id]` on the table `assets` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "accounts_iban_key";

-- AlterTable
ALTER TABLE "budgets" ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_iban_user_id_key" ON "accounts"("iban", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "assets_symbol_user_id_key" ON "assets"("symbol", "user_id");
