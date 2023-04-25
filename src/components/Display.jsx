// alphavantage api key: F4YLJ35S6INL048I

import React, { useEffect, useState } from "react";
import TickerOverview from "./TickerOverview";
import styles from "./Display.module.css";

const Display = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    //twelvedata api
    const apiKey = "0e8a7858ffb04c8a8e68503f73249b26";
    const symbols = ["AAPL", "TSLA"];

    //to prevent repeated entries and redundant fetches
    for (const symbol of symbols) {
      for (const item of data) {
        if (item.symbol == symbol) {
          return;
        }
      }
    }

    symbols.forEach(async (stock) => {
      const res = await fetch(`https://api.twelvedata.com/quote?symbol=${stock}&apikey=${apiKey}`);
      const thisData = await res.json();

      setData((prevData) => {
        return [
          ...prevData,
          {
            symbol: thisData.symbol,
            name: thisData.name,
            close: thisData.close,
            percent_change: thisData.percent_change,
            change: thisData.change,
            volume: thisData.volume,
          },
        ];
      });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h1>Navbar component here</h1>
      <div className={styles.bigBackground}>
        <input className={styles.searchBar} placeholder="Search here"></input>
      </div>
      <div className="container">
        <div className={`row ${styles.row}`}>
          <div className="col-md-1">Name</div>
          <div className="col-md-1">Ticker</div>
          <div className="col-md-1">Price</div>
          <div className="col-md-1">Change</div>
          <div className="col-md-1">Chg %</div>
          <div className="col-md-1">Volume</div>
          <div className="col-md-1"></div>
        </div>
      </div>

      {data.map((stock) => {
        return (
          <TickerOverview
            name={stock.name}
            symbol={stock.symbol}
            close={stock.close}
            volume={stock.volume}
            percent_change={stock.percent_change}
            change={stock.change}
            key={stock.symbol}
            id={stock.symbol}
          />
        );
      })}
    </>
  );
};

export default Display;
