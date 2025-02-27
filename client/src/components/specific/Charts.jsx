import React from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Chart as chartJS,
} from "chart.js";
import { lightPink, pink, orange } from "../constants/color";
import { getLast7Days } from "../../lib/features";

chartJS.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      // display:false,
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
      // display:false,
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        backgroundColor: pink,
        borderColor: lightPink,
        fill: true,
        label: "Revenue",
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};
const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  cutout:110,
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        backgroundColor: [pink, lightPink],
        borderColor: [orange, orange],
        hoverBackgroundColor:[orange,orange],
        offset:20,
      },
    ],
  };
  return <Doughnut style={{zIndex:10}} data={data} options={doughnutChartOptions} />;
};

export { LineChart, DoughnutChart}; 
