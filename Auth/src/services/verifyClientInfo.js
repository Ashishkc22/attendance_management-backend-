const { prisma } = require("../config/db");
const { comparePassword } = require("../utils/hash");

async function verifyClientInfo(client_id, client_secret) {
  try {
    const clientInfo = await prisma.clientInfo.findUnique({
      where: {
        client_id,
      },
    });
    if(!clientInfo){
        throw new Error("Client Info not found;")
    }

    return comparePassword(client_secret,clientInfo.client_secret);
  } catch (error) {
    throw error;
  }
}

module.exports = verifyClientInfo;
