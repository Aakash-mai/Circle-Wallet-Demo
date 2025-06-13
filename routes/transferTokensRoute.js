const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { getEntitySecretCipherText } = require("../utils/getCipherText");
const { transferTokens } = require("../services/transferTokens");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { amounts, feeLevel, tokenId, walletId, destinationAddress } = req.body;

    if (!amounts || !feeLevel || !tokenId || !walletId || !destinationAddress) {
      return res.status(400).json({ error: "Missing required fields in request body." });
    }

    const apiKey = process.env.CIRCLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured." });
    }

    const entitySecretCipherText = await getEntitySecretCipherText();
    const idempotencyKey = uuidv4();

    const response = await transferTokens(
      apiKey,
      idempotencyKey,
      entitySecretCipherText,
      amounts,
      feeLevel,
      tokenId,
      walletId,
      destinationAddress
    );

    res.status(200).json(response);
  } catch (error) {
    console.error("Token transfer failed:", error);
    res.status(500).json({ error: "Failed to transfer tokens." });
  }
});

module.exports = router;
