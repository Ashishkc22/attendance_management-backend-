const seedClientInfo = require("./generateClientSeed");
const seedSuperAdmin = require("./seed-super-admin-user");

async function generateSeedData() {
  try {
    console.log("🌱 Starting seed data generation...");

    await seedClientInfo();
    console.log("✅ Client info seeded successfully.");

    await seedSuperAdmin();
    console.log("✅ Super admin seeded successfully.");

    console.log("🎉 All seed data generated successfully!");
  } catch (error) {
    console.error("❌ An error occurred during seed data generation:", error);
    process.exit(1);
  }
}

generateSeedData();
