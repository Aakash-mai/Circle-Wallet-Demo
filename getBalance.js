const fetch = require("node-fetch");
const walletId = "e4b1f238-0382-5b26-bbaf-604e68c5898b"; // Replace with your actual wallet ID
const url = `https://api.circle.com/v1/w3s/wallets/${walletId}/balances`;
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer TEST_API_KEY:d9a6695ead6e35e78d87e9db578b52dd:7051d4f398bd97fe4165fe85088b5a9c",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => {
    console.log("Full Response:");
    console.log(JSON.stringify(json, null, 2));
  })
  .catch((err) => console.error("error:" + err));
