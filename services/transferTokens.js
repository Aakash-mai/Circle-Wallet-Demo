const fetch = require("node-fetch");

/**
 * Transfer tokens using Circle's W3S API
 *
 * @param {string} apiKey - The Circle API key
 * @param {string} idempotencyKey - A unique idempotency key for this request
 * @param {string} entitySecretCipherText - The encrypted entity secret
 * @param {string[]} amounts - Array of token amounts (in smallest unit)
 * @param {string} feeLevel - Transaction fee level (e.g., "HIGH", "MEDIUM")
 * @param {string} tokenId - The token UUID
 * @param {string} walletId - Source wallet ID
 * @param {string} destinationAddress - Recipient blockchain address
 * @returns {Promise<Object>} - Circle API response
 */
async function transferTokens(apiKey, idempotencyKey, entitySecretCipherText, amounts, feeLevel, tokenId, walletId, destinationAddress) {
  const url = "https://api.circle.com/v1/w3s/developer/transactions/transfer";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      idempotencyKey,
      entitySecretCipherText,
      amounts,
      feeLevel,
      tokenId,
      walletId,
      destinationAddress,
    }),
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Transfer token error:", err);
    throw err;
  }
}

module.exports = { transferTokens };

// const fetch = require("node-fetch");

// const { v4: uuidv4 } = require("uuid");
// const idempotencyKey = uuidv4();

// const url = "https://api.circle.com/v1/w3s/developer/transactions/transfer";
// const options = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: "Bearer TEST_API_KEY:d9a6695ead6e35e78d87e9db578b52dd:7051d4f398bd97fe4165fe85088b5a9c",
//   },
//   body: JSON.stringify({
//     idempotencyKey: idempotencyKey,
//     entitySecretCipherText:
//       "wbzytN1Y6zud1GL8wJohHAEn1AEBIroacpyNFpLvk6QPYScekqdX3ab3sCQtdijsnfiyudZJ0hCrk7h9KCKwAYmpPShUsuhPQmeE0/AH0pbs+SesfvBzyyNY43AEkZzws+lVntUm+SfSkU7lgGunR4yahnUrdHePnNHLm6G+FWyxNPTVN0qco83cfnfHpZ6p2rWyx7loPwZW8FhTOn4s+ToIHWkz8pyuGlXZVk7GqdGHuLoQdQhI40jHYODTHgTYnPmIyiwfWxyMVO/BYY0a+0Tspl/jzJEZXahr9q4G/A5CJcWFI/Gi+9kt946k1Gs+t1tc/Wx2F0u0CRUcRmwdzeXXB3VJlOa5pDVjJ6C2WZFAdkn9MmB1dFxZaeBXlHHmDLjyVb+2+6Vbkf357QKzd+Xmh4+JVpj6YYgg2eDkdc9p+cY0n6pbI0O4Tmt5ym54K7c0mDKpGKSYRpukDw0mbT4v+MeH9LUH5Lsemx1jXS1kYtW2+RCbeB7uYLopVvmnQm7wbWOgSj2yI9X7nHFqAUMXXZMzcL8j9i0NlzKtGuKa6QqPpV3q0MEzyhpa17dtlsNJ2w/jAXxwyvqYwwB9uO2cmw1kht+ZZmuiVvgKSDaQj20p116XXuA3lKBrVYjyYGpbZ7ENauy3x3BRIxHUuWaNiXZUyWJBVjUPxBQk7io=",
//     amounts: ["0.05"], // Amount in the smallest unit of the token (e.g., 0.01 MATIC)
//     feeLevel: "HIGH",
//     tokenId: "0c8f8485-f74f-5e28-80f2-3cc4e80ef71c",
//     walletId: "e4b1f238-0382-5b26-bbaf-604e68c5898b",
//     destinationAddress: "0xc35537c7dA2B8e935F47C7Fc62c3092312D19107",
//   }),
// };

// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error("error:" + err));
