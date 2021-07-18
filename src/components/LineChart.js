import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

function LineChart(props) {
  const data = props.data;
  const options = {
    title: {
      display: true,
      position: "top",
      text: "Daily Average Chart",
    }
  };

  const getData = () => {};
  return (
    <>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 5,
          "@media (max-width: 768px)": {
            marginTop: "10vh",
          },
        }}
      >
        <Line data={data} options={options} />
      </div>
    </>
  );
}
export default LineChart;
