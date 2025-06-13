const express = require("express");
const transferTokens = require("./routes/transferTokensRoute");
const createWalletSet = require("./routes/createWalletSetRoute");
const createWallets = require("./routes/createWalletRoute");
const app = express();

app.use(express.json());

app.use("/transferTokens", transferTokens);
app.use("/createWalletSet", createWalletSet);
app.use("/wallets", createWallets);

app.get("/", (req, res) => {
  res.send("Service Up and Running!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
