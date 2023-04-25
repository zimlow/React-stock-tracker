import React, { useRef, useState, useEffect } from "react";
import { createChart } from "lightweight-charts";
import Chart from "./Chart";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

const Overlay = (props) => {
  const [candlestickData, setCandlestickData] = useState([]);
  const [lineData, setLineData] = useState([]);

  const getChartData = async () => {
    const res = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${props.symbol}&interval=1day&outputsize=30&apikey=0e8a7858ffb04c8a8e68503f73249b26`
    );
    const data = await res.json();

    //configure data for line series
    const lineData = data.values.map((item) => ({
      time: item.datetime,
      value: JSON.parse(item.close),
    }));

    //configure data to candlestick series
    const candleData = data.values.map((item) => ({
      time: item.datetime,
      open: JSON.parse(item.open),
      high: JSON.parse(item.high),
      low: JSON.parse(item.low),
      close: JSON.parse(item.close),
    }));

    setCandlestickData(candleData.reverse());
    setLineData(lineData.reverse());
  };

  useEffect(() => {
    getChartData();
  }, []);

  const handleClick = (e) => {
    if (e.target != e.currentTarget) {
      return;
    } else props.setShowChart(false);
  };

  return (
    <div className={styles.backdrop} onClick={handleClick}>
      <div className={styles.modal} id="container">
        <Chart
          lineData={lineData}
          candlestickData={candlestickData}
          setShowChart={props.setShowChart}
          symbol={props.symbol}
          name={props.name}
        />
      </div>
    </div>
  );
};

const StockChartModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Overlay
          symbol={props.symbol}
          name={props.name}
          setShowChart={props.setShowChart}
          lineData={props.lineData}
          candlestickData={props.candlestickData}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default StockChartModal;
