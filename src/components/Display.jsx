import React, { useEffect, useState } from "react";
import TickerOverview from "./TickerOverview";
import styles from "./Display.module.css";
import NavBar from "./NavBar";

const Display = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    //twelvedata api
    const apiKey = "";
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
      const res = await fetch(
        `https://api.twelvedata.com/quote?symbol=${stock}&apikey=${
          import.meta.env.VITE_POLYGON_APIKEY
        }`
      );
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
      <div className={styles.navBar}>
        <NavBar />
      </div>
      <div className={styles.bigBackground}>
        <input className={styles.searchBar} placeholder="Search Stocks here" />
        <div className={styles.searchIcon}></div>
      </div>
      <div className="container">
        <div className={`row ${styles.row}`}>
          <div className="col-md-3"></div>
          <div className="col-md-1">
            <strong>Name</strong>
          </div>
          <div className="col-md-1">
            <strong>Ticker</strong>
          </div>
          <div className="col-md-1">
            <strong>Price</strong>
          </div>
          <div className="col-md-1">
            <strong>Change</strong>
          </div>
          <div className="col-md-1">
            <strong>Chg %</strong>
          </div>
          <div className="col-md-1">
            <strong>Volume</strong>
          </div>

          <div className="col-md-3"></div>
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
