// circleWalletSet.js
const fetch = require("node-fetch");

/**
 * Creates a wallet set using the Circle API.
 *
 * @param {string} apiKey - The API key for authorization.
 * @param {string} idempotencyKey - A unique key to ensure idempotency.
 * @param {string} entitySecretCipherText - Encrypted secret.
 * @param {string} name - Name of the wallet set.
 * @returns {Promise<Object>} - The JSON response from the API.
 */
async function createWalletSet(apiKey, idempotencyKey, entitySecretCipherText, name) {
  const url = "https://api.circle.com/v1/w3s/developer/walletSets";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      idempotencyKey,
      entitySecretCipherText,
      name,
    }),
  };

  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (err) {
    console.error("Error creating wallet set:", err);
    throw err;
  }
}

module.exports = { createWalletSet };
