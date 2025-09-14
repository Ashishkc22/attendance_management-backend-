const { generateKeyPairSync } = require("crypto");
const fs = require("fs");

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki", // Recommended for JWT
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8", // Recommended for JWT
    format: "pem",
  },
});

// Write to files
fs.writeFileSync("private.key", privateKey);
fs.writeFileSync("public.key", publicKey);

console.log("Keys generated!");
