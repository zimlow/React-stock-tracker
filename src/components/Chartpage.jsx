import React, { useState, useEffect } from "react";
import Chart from "./Chart";
import styles from "./Modal.module.css";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const Chartpage = () => {
  const [candlestickData, setCandlestickData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const location = useLocation();

  const getChartData = async () => {
    const res = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${
        location.state.symbol
      }&interval=1day&outputsize=30&apikey=${import.meta.env.VITE_12DATA_APIKEY}`
    );
    const data = await res.json();
    console.log("data is: ", data);

    //configure data for line series
    const lineData = data.values.map((item) => ({
      time: item.datetime,
      value: JSON.parse(item.close),
    }));
    console.log("lineData is: ", lineData);

    //configure data to candlestick series
    const candleData = data.values.map((item) => ({
      time: item.datetime,
      open: JSON.parse(item.open),
      high: JSON.parse(item.high),
      low: JSON.parse(item.low),
      close: JSON.parse(item.close),
    }));
    console.log("candleData is: ", candleData);
    setCandlestickData(candleData.reverse());
    setLineData(lineData.reverse());
  };

  useEffect(() => {
    getChartData();
  }, []);

  return (
    <div className={styles.modal} id="container">
      <NavBar />
      <Chart
        lineData={lineData}
        candlestickData={candlestickData}
        symbol={location.state.symbol}
        name={location.state.name}
      />
    </div>
  );
};

export default Chartpage;
