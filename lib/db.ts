import { PrismaClient } from "@prisma/client";
/* 
declare global {
  var prisma1: PrismaClient | undefined;
  var prisma2: PrismaClient | undefined;
}
 */
export const db =
  /* 
  globalThis.prisma1 || */
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

export const gradedb =
  /* 
  globalThis.prisma2 || */
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.MONGODB_URI,
      },
    },
  });
/* 
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma1 = db;
  globalThis.prisma2 = gradedb;
} */

export default { db, gradedb };
