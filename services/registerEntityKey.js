const crypto = require("crypto");
const { registerEntitySecretCiphertext } = require("@circle-fin/developer-controlled-wallets");

const registerEntityKey = async () => {
  try {
    const secret = crypto.randomBytes(32).toString("hex");

    console.log(secret);
    const response = await registerEntitySecretCiphertext({
      apiKey: "TEST_API_KEY:d9a6695ead6e35e78d87e9db578b52dd:7051d4f398bd97fe4165fe85088b5a9c",
      entitySecret: secret,
    });
    console.log(response.data?.recoveryFile);
  } catch (error) {
    console.error("Error registering entity secret ciphertext:", error);
  }
};
registerEntityKey();
//3ac94f648978c332b89b43ff4f93727944cacd9fede6127b0560643271ded010
