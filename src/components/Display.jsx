import React, { useRef, useEffect, useState } from "react";
import TickerOverview from "./TickerOverview";
import styles from "./Display.module.css";

const Display = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState();
  const searchBarRef = useRef();
  const symbols = ["AAPL", "NFLX", "AMZN", "NVDA"];

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#555"
          viewBox="0 0 16 16"
          className={styles.icon}
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
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
