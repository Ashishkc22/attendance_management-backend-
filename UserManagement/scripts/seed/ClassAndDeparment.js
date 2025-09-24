// prisma/seed.ts
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create departments first and capture their generated UUIDs
  const departments = await prisma.department.createMany({
    data: [
      { name: 'Computer Science' },
      { name: 'Mechanical' },
      { name: 'Electrical' },
      { name: 'Civil' },
      { name: 'Mathematics' },
    ],
    skipDuplicates: true,
  });

  // Retrieve departments to get their UUIDs
  const departmentList = await prisma.department.findMany();

  const cs = departmentList.find((d) => d.name === 'Computer Science');
  const me = departmentList.find((d) => d.name === 'Mechanical');
  const ee = departmentList.find((d) => d.name === 'Electrical');
  const ce = departmentList.find((d) => d.name === 'Civil');
  const math = departmentList.find((d) => d.name === 'Mathematics');

  if (!cs || !me || !ee || !ce || !math) {
    throw new Error('One or more departments not found');
  }

  await prisma.classDetails.createMany({
    data: [
      { name: 'CS101', departmentId: cs.id },
      { name: 'CS102', departmentId: cs.id },
      { name: 'ME101', departmentId: me.id },
      { name: 'EE101', departmentId: ee.id },
      { name: 'CE101', departmentId: ce.id },
      { name: 'MATH101', departmentId: math.id },
      { name: 'MATH102', departmentId: math.id },
      { name: 'CS201', departmentId: cs.id },
      { name: 'EE102', departmentId: ee.id },
    ],
  });
}

module.exports = main;
