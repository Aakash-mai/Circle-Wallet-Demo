const fetch = require("node-fetch");
const url = "https://api.circle.com/v1/w3s/config/entity/publicKey";
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer TEST_API_KEY:bb643b0cd596234cb9ad423cd7a4082f:267bc718286207a1e4a768e516c00e03",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));
