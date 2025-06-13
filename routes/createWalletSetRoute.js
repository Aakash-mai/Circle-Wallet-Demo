const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { getEntitySecretCipherText } = require("../utils/getCipherText");
const { createWalletSet } = require("../services/createWalletSet");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Missing 'name' in request body" });
    }

    const apiKey = process.env.CIRCLE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Missing API key configuration" });
    }

    // Get encrypted secret
    const entitySecretCipherText = await getEntitySecretCipherText();
    const idempotencyKey = uuidv4();

    // Call Circle API
    const response = await createWalletSet(apiKey, idempotencyKey, entitySecretCipherText, name);

    res.status(200).json(response);
  } catch (error) {
    console.error("Error creating wallet set:", error);
    res.status(500).json({ error: "Failed to create wallet set" });
  }
});

module.exports = router;
