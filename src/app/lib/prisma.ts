import { PrismaClient } from "@/generated/prisma";

// This is the standard Prisma singleton pattern.
// It prevents multiple instances of PrismaClient from being created in development
// due to Next.js's hot reloading feature.

// 1. Declare a global variable to hold the Prisma client instance.
//    'globalThis' is a standard way to access the global object across environments.
declare global {
  var prisma: PrismaClient | undefined;
}

// 2. Create the Prisma client instance.
//    - In production, a new client is always created.
//    - In development, we check if a client already exists on the global object.
//      If it does, we reuse it. If not, we create a new one.
const prisma = globalThis.prisma || new PrismaClient();

// 3. In non-production environments, we assign the client to the global object.
//    This ensures that the same instance is reused on subsequent hot reloads.
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// 4. Export the single, shared instance.
export default prisma;
