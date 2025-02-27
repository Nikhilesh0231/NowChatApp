import React from 'react';
import {Line , Doughnut} from 'react-chartjs-2';
import {CategoryScale,Tooltip,Filler,LinearScale,PointElement,LineElement,ArcElement,Legend, Chart as chartJS} from 'chart.js';

chartJS.register(CategoryScale,Tooltip,Filler,LinearScale,PointElement,LineElement,ArcElement,Legend);

const lineChartOptions ={
  responsive: true,
  plugins: {
    legend: {
      display:false,
    },
    title: {
      display: false,
    },
  },
  scales:{
    x:{
      grid:{
        display:false,
      },
      // display:false,
    },
    y:{
      beginAtZero:true,
      grid:{
        display:false,
      },
      // display:false, 
    },
  }
}; 

const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
      data:[1,5,39,24],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      fill:false,
      label:"Revenue",
    },
      {
      data:[11,52,9,84],
      backgroundColor: 'rgba(25, 99, 132, 0.2)',
      borderColor: 'rgba(55, 99, 132, 1)',
      fill:false,
      label:"Revenue2",
    },
  ],
  };
  return (
   <Line data={data} options={lineChartOptions}/>
  )
}
const DoughnutChart = () => {
  return (
    <div>DoughnutCharts</div>
  )
}

export  {LineChart,DoughnutChart} 