import { PrismaClient } from "@prisma/client";

// In development, Next.js hot-reloads your code frequently, which would
// otherwise create a new PrismaClient (and a new DB connection) on every
// file save. Storing it on `globalThis` keeps a single instance alive.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
