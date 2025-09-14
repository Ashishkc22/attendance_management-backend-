const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("../src/utils/hash");
require("dotenv").config();

const prisma = new PrismaClient();

const rolesConstants = [
  { name: "ADMIN", description: "Administrator role" },
  { name: "TEACHER", description: "Regular user role" },
  { name: "STUDENT", description: "Moderator role" },
];

const adminUser = {
  first_name: "Ashish",
  middle_name: "Krishna",
  last_name: "Choudhari",
  email: "ashishchoudhari244@gmail.com",
  password: "",
  role: "ADMIN",
  is_active: true,
  is_email_verified: false,
};

const defaultPassword = "Admin@123"

async function main() {
  // Inserting all roles
  const roles = await prisma.roles.createManyAndReturn({
    data: rolesConstants,
    skipDuplicates: true,
  });

  const adminRole = roles.find((r) => r.name == "ADMIN");

  console.info("Roles seeded:", roles);

  //insert permsissions
  const permissions = await prisma.$transaction([
    prisma.permissions.create({
      data: {
        name: "READ_USERS",
        description: "Permission to read user data",
      },
    }),
    prisma.permissions.create({
      data: {
        name: "CREATE_USERS",
        description: "Permission to create user",
      },
    }),
  ]);

  //   Inserting admin user
  const hashedPassword = hashPassword(defaultPassword);
  const user = await prisma.users.create({
    data: {
      ...adminUser,
      password: hashedPassword,
    },
  });

  //assign all permissions to admin role
  await prisma.rolePermission.createMany({
    data: [
      {
        role_id: adminRole.id,
        permission_id: permissions[0].id, // READ_USERS
        user_id: user.id,
      },
      {
        role_id: adminRole.id,
        permission_id: permissions[1].id, // CREATE_USERS
        user_id: user.id,
      },
    ],
    skipDuplicates: true,
  });
  console.info("Admin sedding completed: ", user);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
