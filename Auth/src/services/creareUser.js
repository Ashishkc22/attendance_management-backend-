const { hashPassword } = require("../utils/hash");
async function createUser(data) {
  try {
    // Get role
    const adminRole = await prisma.roles.findFirst({ where: { name: data.role} });

    if (!adminRole) {
      throw new Error("Role not found.");
    }

    // add permissions
    const permission = await prisma.permissions.findFirst({
      where: {
        name: "READ_USERS",
      },
    });
    if (!permission) {
      throw new Error("permission not found.");
    }
    const hashedPassword = hashPassword(data.password || "");
    const user = await prisma.users.create({
      data: {
        first_name: data.first_name,
        middle_name: data.middle_name || "",
        last_name: data.last_name,
        email: data.email,
        role: "TEACHER",
        password: hashedPassword,
      },
    });

    await prisma.rolePermission.create({
      data: {
        role_id: adminRole.id,
        permission_id: permission.id, // READ_USERS
        user_id: user.id,
      },
    });

    return user;
  } catch (error) {
    throw error;
  }
}

module.exports = createUser;
