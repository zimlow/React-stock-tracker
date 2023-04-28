import React, { useRef, useEffect, useState } from "react";
import TickerOverview from "./TickerOverview";
import styles from "./Display.module.css";

const Display = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const searchBarRef = useRef();
  const symbols = ["AAPL", "AMZN", "NFLX", "GOOG", "META"];

  const getData = async () => {
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
          import.meta.env.VITE_12DATA_APIKEY
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
  const handleSearch = () => {
    const searchTerm = searchBarRef.current.value.toLowerCase();
    console.log("searchBarRef.current.value: ", searchBarRef.current.value);
    console.log("data is: ", data);

    const filteredData = data.filter(
      (stock) =>
        stock.symbol.toLowerCase().startsWith(searchTerm) ||
        stock.name.toLowerCase().startsWith(searchTerm)
    );

    setFilteredData(filteredData);
  };

  useEffect(() => {
    getData();
  }, []);

  const dataToShow = filteredData ? filteredData : data;

  return (
    <>
      <div className={styles.bigBackground}>
        <h1>Hello.</h1>
        <input
          className={styles.searchBar}
          placeholder="Search Stocks"
          ref={searchBarRef}
          onChange={handleSearch}
        />
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

      {dataToShow?.map((stock) => {
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
