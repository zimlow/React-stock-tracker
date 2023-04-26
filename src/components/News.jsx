import React from "react";
import styles from "./News.module.css";

const News = () => {
  return (
    <>
      <div className={styles.bigBackground}>
        <div className={styles.popUp}>
          <h1>
            <strong>All the news</strong>
          </h1>
        </div>
      </div>
    </>
  );
};

export default News;
