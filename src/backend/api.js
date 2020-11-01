const express = require("express");
const CoinGecko = require("coingecko-api");
const app = express();
var cors = require("cors");

app.use(cors())
const port = process.env.PORT || 4000 ;

const CoinGeckoClient = new CoinGecko();

app.get("/", (req, res) => {
  var getCoins = async () => {
    try {
      var data = await CoinGeckoClient.coins.markets({
        per_page: 10,
      });
        // console.log(data.data)
    } catch (error) {
      console.log("Failed to fetch data back");
    }
      res.send(data);
  };
  getCoins();
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
