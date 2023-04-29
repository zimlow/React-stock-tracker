# Project 2 - Stock Viewer React App

## Overview

A React app to view the daily chart of a stock over a 30 days period

## Technologies used

<p>React, TradingView's lightweight-charts</p>
<p>API used: [Twelvedata](https://twelvedata.com/docs#core-data)</p>

## General Approach

<ul>
    <li>Due to API limitations, only four stocks will be shown in the main page.</li>
    <li>A button to launch an individual stock's chart will appear as you hover over it.</li>
    <li>Choose to display either line chart or candlestick (default)</li>
    <li>Default timeframe is 1D and default range is 30 periods i.e. 30 days</li>
    <li>Click browser back button or Main button in navbar to go back to Main</li>
</ul>

<ul> <strong>Note for API usage:</strong>
    <li>requires personal API key, obtained from twelvedata</li>
    <li>enclose it in an .env file and retrieve it in the code</li>
</ul>
