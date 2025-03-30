/*
  Warnings:

  - You are about to drop the column `bank_account_id` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_bank_account_id_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "bank_account_id",
ADD COLUMN     "account_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_fkey" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
