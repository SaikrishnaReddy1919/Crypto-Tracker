import React, { useState, useEffect } from "react";
import "./App.css";
import { Line } from "react-chartjs-2";

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    let getCoins = async () => {
      try {
        var data;
        await fetch("http://localhost:4000/")
          .then((res) => {
            return res.json();
          })
          .then((response) => {
            console.log("res: " + JSON.stringify(response.data));
            setCoins(response.data)
          });
      }
      catch (error) {
        console.log(error)
       }
    };
    getCoins();
  }, []);

  return (
    <div className="coin-app">
      <h1>CryptoCurrency Tracker App</h1>
      <h3>Using : ReactJS + CharJs + Nodejs + ExpressJS & Coingecko API</h3>
      <Line
        data={{
          labels: coins.map((coin) => coin.name),
          datasets: [
            {
              data: coins.map((coin) => coin.price_change_percentage_24h),
              label: "price change",
              borderColor: "blue",
              backgroundColor: coins.map((coin) =>
                coin.price_change_percentage_24h >= 0 ? "green" : "red"
              ),
              borderWidth: 5,
              fill: false,
              pointHoverRadius: 15,
            },
            {
              data: coins.map((coin) => coin.market_cap_change_percentage_24h),
              label: "market cap change",
              borderColor: "green",
              backgroundColor: coins.map((coin) =>
                coin.market_cap_change_percentage_24h >= 0 ? "green" : "red"
              ),
              borderWidth: 5,
              fill: false,
              pointHoverRadius: 15,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
      <Line
        data={{
          labels: coins.map((coin) => coin.name),
          datasets: [
            {
              data: coins.map((coin) => coin.ath_change_percentage),
              label: "All time high percentage Change",
              borderColor: "#008cff",
              backgroundColor: "white",
              borderWidth: 5,
              fill: false,
              pointHoverRadius: 15,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
}

export default App;
