import React from "react";
import styles from "./TickerOverview.module.css";
import { Link } from "react-router-dom";

const TickerOverview = (props) => {
  const tidyUp = (int) => {
    return Math.round(int * 100) / 100;
  };

  return (
    <>
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
            <Link
              to={`/main/${props.symbol}`}
              state={{ symbol: props.symbol, name: props.name }}
              style={{ textDecoration: "none" }}
            >
              <button className={styles.button}>
                <strong>Launch Chart</strong>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TickerOverview;
