const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { getEntitySecretCipherText } = require("../utils/getCipherText");
const { createWallets } = require("../services/createWallet");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    //
    const { walletSetId, blockchains = ["MATIC-AMOY"], count = 1, accountType = "SCA" } = req.body;

    if (!walletSetId) {
      return res.status(400).json({ error: "Missing 'walletSetId' in request body" });
    }

    const apiKey = process.env.CIRCLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing API key configuration" });
    }

    const entitySecretCipherText = await getEntitySecretCipherText();
    const idempotencyKey = uuidv4();

    const response = await createWallets(apiKey, idempotencyKey, entitySecretCipherText, blockchains, count, accountType, walletSetId);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error creating wallet(s):", error);
    res.status(500).json({ error: "Failed to create wallet(s)" });
  }
});

module.exports = router;
