/*
  Warnings:

  - Added the required column `createdAt` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "createdAt" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "codesId" TEXT NOT NULL,
    CONSTRAINT "order_codesId_fkey" FOREIGN KEY ("codesId") REFERENCES "code" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_order" ("amount", "codesId", "id", "name", "price") SELECT "amount", "codesId", "id", "name", "price" FROM "order";
DROP TABLE "order";
ALTER TABLE "new_order" RENAME TO "order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
