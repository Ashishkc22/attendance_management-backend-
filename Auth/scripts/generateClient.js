const crypto = require('crypto');
const { PrismaClient } = require("@prisma/client")
const { hashPassword } = require("../src/utils/hash")

const prisma = new PrismaClient();
const client_name = "user-management";

(async function main(){
    // Generate client_id as UUID (v4)
    (async () => {
      const { v4: uuidv4 } = await import('uuid');
      // use uuidv4 here
      let client_id = uuidv4();
      console.log('Client ID:', client_id);
        
    // Generate client_secret as 32 random bytes (base64)
    const client_secret = crypto.randomBytes(32).toString('base64');
    console.log('Client Secret:', client_secret);
    await prisma.clientInfo.create({
        data: {
            client_id,
            client_secret: hashPassword(client_secret),
            client_name
        }
    })
    console.log("Client info inserted successfully.");
    })();
})()