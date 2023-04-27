import { createChart, ColorType, CrosshairMode } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Chart.module.css";

export default function Chart(props) {
  const chartContainerRef = useRef();
  const [chartType, setChartType] = useState("candles");
  const chartTypeRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      chart.applyOptions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: "ashgrey" },
        textColor: "#C3BCDB",
      },
      grid: {
        vertLines: { color: "" },
        horzLines: { color: "" },
      },
      width: window.innerWidth,
      height: window.innerHeight,
      watermark: {
        visible: true,
        fontSize: 200,
        horzAlign: "center",
        vertAlign: "center",
        color: "#333",
        text: `${props.symbol}`,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
    });

    //create area series chart
    const lineSeries = chart.addAreaSeries({
      lastValueVisible: false, // hide the last value marker for this series
      crosshairMarkerVisible: false, // hide the crosshair marker for this series
      lineColor: "transparent", // hide the line
      topColor: "rgba(56, 33, 110,0.6)",
      bottomColor: "rgba(56, 33, 110, 0.1)",
    });
    lineSeries.setData(props.lineData);

    //create candlestick series chart
    const candleSeries = chart.addCandlestickSeries({
      wickUpColor: "rgb(54, 116, 217)",
      upColor: "rgb(54, 116, 217)",
      wickDownColor: "rgb(225, 50, 85)",
      downColor: "rgb(225, 50, 85)",
      borderVisible: false,
    });
    candleSeries.setData(props.candlestickData);

    //insert legend
    const container = document.getElementById("container");
    const legend = document.createElement("div");

    legend.style = `position: absolute; left: 12px; top: 40px; z-index: 1; font-size: 20px; font-family: sans-serif; line-height: 18px; font-weight: 300;`;
    container.appendChild(legend);

    const firstRow = document.createElement("div");
    firstRow.style.color = "white";
    legend.appendChild(firstRow);

    // reading mouse movement to reflect price
    chart.subscribeCrosshairMove((param) => {
      let priceFormatted = "";
      if (param.time) {
        const data = param.seriesData.get(lineSeries);
        const price = data.value !== undefined ? data.value : data.close;
        priceFormatted = price.toFixed(2);
      }
      firstRow.innerHTML = `${props.name} • 1D <strong>${priceFormatted}</strong>`;
    });

    chart.timeScale().fitContent();

    if (chartType != "candles") {
      lineSeries.applyOptions({
        topColor: "rgba(38, 198, 218, 0.56)",
        bottomColor: "rgba(38, 198, 218, 0.04)",
        lineColor: "rgba(38, 198, 218, 1)",
        lineWidth: 2,
        lastValueVisible: true,
      });
      chart.removeSeries(candleSeries);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      chart.remove();
    };
  }, [props.lineData, props.candlestickData, chartType]);

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <>
      {/* Chart toolbar */}
      <div className={styles.toolbar}>
        <select ref={chartTypeRef} onChange={handleChartTypeChange} defaultValue="">
          <option value="" disabled hidden>
            Select Chart Type
          </option>
          <option value="line">Line Chart</option>
          <option value="candles">Candlestick Chart</option>
        </select>
      </div>

      {/* Actual Chart */}
      <div ref={chartContainerRef}></div>
    </>
  );
}
