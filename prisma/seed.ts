import { PrismaClient } from "../src/generated/prisma";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // const hashedPassword = await bcrypt.hash("password123", 10);
  // const user = await prisma.user.create({
  //   data: {
  //     email: "test@gmail.com",
  //     full_name: "bang testing",
  //     password: hashedPassword,
  //   },
  // });

  const label = await prisma.label.create({
    data: {
      user_id: "f0991144-56b3-42de-af9e-ff0ea34e900d",
      name: "Makan",
    },
  });

  await prisma.expense.create({
    data: {
      label_id: label.label_id,
      name: "Makan Warteg",
      price: 15000,
      quantity: 1,
      user_id: "f0991144-56b3-42de-af9e-ff0ea34e900d",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
