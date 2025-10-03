const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Seed Departments
  const csDepartment = await prisma.department.upsert({
    where: { name: 'Computer Science' },
    update: {},
    create: {
      name: 'Computer Science',
    },
  });

  const mathDepartment = await prisma.department.upsert({
    where: { name: 'Mathematics' },
    update: {},
    create: {
      name: 'Mathematics',
    },
  });

  // Seed Classes
  const classA = await prisma.classDetails.create({
    data: {
      name: 'CS101',
      department: {
        connect: { id: csDepartment.id },
      },
    },
  });

  const classB = await prisma.classDetails.create({
    data: {
      name: 'MATH201',
      department: {
        connect: { id: mathDepartment.id },
      },
    },
  });

  // Seed Users
  const user1 = await prisma.userProfile.create({
    data: {
      first_name: 'Ashish',
      middle_name: 'K',
      last_name: 'Choudhari',
      email: 'ashishchoudhari244@gmail.com',
      shift: 'Morning',
      role: 'ADMIN',
      status: 'Active',
      isActive: true,
      department: {
        connect: { id: csDepartment.id },
      },
      class: {
        connect: { id: classA.id },
      },
    },
  });


  // Seed Attendance
  await prisma.attendance.createMany({
    data: [
      {
        date: new Date(),
        status: 'Present',
        userId: user1.id,
      },
    ],
  });

  console.log('🌱 Seeding complete.');
}

function run(){
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
}


module.exports = run
