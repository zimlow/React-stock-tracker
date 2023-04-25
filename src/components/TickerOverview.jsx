import React, { useState } from "react";
import StockChartModal from "./StockChartModal";
import styles from "./TickerOverview.module.css";

const TickerOverview = (props) => {
  const [showChart, setShowChart] = useState(false);

  const tidyUp = (int) => {
    return Math.round(int * 100) / 100;
  };

  return (
    <>
      {showChart && (
        <StockChartModal name={props.name} symbol={props.symbol} setShowChart={setShowChart} />
      )}

      <div className="container">
        <div className={`row ${styles.row}`}>
          <div className="col-md-3"></div>
          <div className={`col-md-1 ${styles.stock}`}>{props.name}</div>
          <div className={`col-md-1 ${styles.stock}`}>{props.symbol}</div>
          <div className={`col-md-1 ${styles.stock}`}>{tidyUp(JSON.parse(props.close))}</div>
          <div
            className={`col-md-1 ${styles.stock} ${props.change < 0 ? styles.red : styles.green}`}
          >
            {tidyUp(JSON.parse(props.change))}
          </div>
          <div
            className={`col-md-1 ${styles.stock} ${
              props.percent_change < 0 ? styles.red : styles.green
            }`}
          >
            {tidyUp(JSON.parse(props.percent_change))}%
          </div>

          <div className={`col-md-1 ${styles.stock}`}>
            {tidyUp(JSON.parse(props.volume) / 1000000)}M
          </div>
          <div className="col-md-3">
            <button className={styles.button} onClick={() => setShowChart(true)}>
              Launch Chart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TickerOverview;
