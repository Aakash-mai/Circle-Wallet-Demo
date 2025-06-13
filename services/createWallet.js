// circleWallet.js
const fetch = require("node-fetch");

/**
 * Creates wallets using the Circle API.
 *
 * @param {string} apiKey - The API key for authorization.
 * @param {string} idempotencyKey - A unique key to ensure idempotency.
 * @param {string} entitySecretCipherText - Encrypted entity secret.
 * @param {string[]} blockchains - List of blockchains (e.g., ["MATIC-AMOY"]).
 * @param {number} count - Number of wallets to create.
 * @param {string} accountType - Type of account, e.g., "SCA".
 * @param {string} walletSetId - UUID of the wallet set to associate the wallets with.
 * @returns {Promise<Object>} - The JSON response from the API.
 */
async function createWallets(apiKey, idempotencyKey, entitySecretCipherText, blockchains, count, accountType, walletSetId) {
  const url = "https://api.circle.com/v1/w3s/developer/wallets";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      idempotencyKey,
      entitySecretCipherText,
      blockchains,
      count,
      accountType,
      walletSetId,
    }),
  };

  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (err) {
    console.error("Error creating wallets:", err);
    throw err;
  }
}

module.exports = { createWallets };
