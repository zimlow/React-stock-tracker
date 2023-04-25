import React, { useState } from "react";
import StockChartModal from "./StockChartModal";
import styles from "./Stock.module.css";

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
          <div className="col-md-1">{props.name}</div>
          <div className="col-md-1">{props.symbol}</div>
          <div className="col-md-1">{tidyUp(JSON.parse(props.close))}</div>
          <div className="col-md-1">{tidyUp(JSON.parse(props.change))}</div>
          <div className="col-md-1">{tidyUp(JSON.parse(props.percent_change))}%</div>
          {/* need to cater for thousands */}
          <div className="col-md-1">{tidyUp(JSON.parse(props.volume) / 1000000)}M</div>
          <button className="col-md-1" onClick={() => setShowChart(true)}>
            chart
          </button>
        </div>
      </div>
    </>
  );
};

export default TickerOverview;
