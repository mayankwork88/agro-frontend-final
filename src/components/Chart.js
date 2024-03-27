import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const CustomChart = ({chartData}) => {
  return (<Line data={chartData} options={{aspectRatio:9,  maintainAspectRatio : false}}/>
  );
}

export default CustomChart;
