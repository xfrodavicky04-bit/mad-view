import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config"; // Ensure env variables are loaded in CLI context

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ||
  (() => {
    const url = process.env.DATABASE_URL || "file:./prisma/dev.db";
    const adapter = new PrismaBetterSqlite3({ url });
    return new PrismaClient({ adapter });
  })();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
