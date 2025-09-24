const { prisma } = require("../config/db")
const createAuthUser = require("./createAuthUser")
const deleteAuthUser = require("./deleteAuthUser")
const generatePassword = require("../utils/generatePassword");

async function inviteUser(data) {
  const { first_name, middle_name, last_name, email, departmentId, shift, role } =
    data;

  // 1. Create user in Auth service
  let authUser;
  try {
    const password = generatePassword();
    authUser = await createAuthUser({
      first_name,
      middle_name,
      last_name,
      email,
      password,
      role,
    });
  } catch (err) {
    throw { status: 502, message: "Auth service failed" };
  }

  // 2. Create profile in local DB
  try {
    return await prisma.userProfile.create({
      data: {
        userId: authUser.id,
        email,
        first_name,
        middle_name,
        last_name,
        departmentId,
        shift,
        role,
      },
    });
  } catch (err) {
    // Rollback in Auth if DB fails
    await rollbackAuthUser(authUser.id);
    throw { status: 500, message: "Failed to create UserProfile" };
  }
}


async function rollbackAuthUser(authUserId) {
  try {
    await deleteAuthUser(authUserId);
  } catch {
    console.error("Rollback failed: Auth user not deleted");
  }
}

module.exports = inviteUser
