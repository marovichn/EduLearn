// Import Prisma clients
import { PrismaClient as PrismaClient1 } from "../prisma/generated/client1";
import { PrismaClient as PrismaClient2 } from "../prisma2/generated/client2";

// Initialize Prisma clients
const db = new PrismaClient1({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
const gradedb = new PrismaClient2({
  datasources: {
    db: {
      url: process.env.MONGODB_URI,
    },
  },
});

export { db, gradedb };
