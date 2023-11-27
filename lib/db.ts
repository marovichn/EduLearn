import { PrismaClient } from "@prisma/client";

const globalDb = (globalThis as any).db as PrismaClient | undefined;

// Initialize Prisma client
const db =
  globalDb ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (!globalDb) {
  (globalThis as any).db = db;
}

export { db };
