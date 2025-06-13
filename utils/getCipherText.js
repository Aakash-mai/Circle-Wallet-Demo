require("dotenv").config();
const { generateEntitySecretCiphertext } = require("@circle-fin/developer-controlled-wallets");
const entitySecret = process.env.ENTITY_SECRET;

async function getEntitySecretCipherText() {
  console.log("APi Key:", process.env.CIRCLE_API_KEY);
  console.log("Entity Secret:", entitySecret);
  const entitySecretCipherText = await generateEntitySecretCiphertext({
    apiKey: process.env.CIRCLE_API_KEY,
    entitySecret: entitySecret,
  });
  console.log("Entity Secret Cipher Text:", entitySecretCipherText);
  return entitySecretCipherText;
}

module.exports = { getEntitySecretCipherText };
