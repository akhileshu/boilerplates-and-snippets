import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

/**
 * - "seed": "ts-node --compiler-options '{\"module\":\"CommonJS\"}' prisma/seed/index.ts"
 * - npx prisma db seed
 */
async function main() {
 
  // await seedUsers();

}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
