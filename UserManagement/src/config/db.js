const { PrismaClient } = require("@prisma/client");

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// terminate the prisma client when server stops
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exist(0);
});

module.exports = {
  prisma,
};
