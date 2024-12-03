import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ reportData }) => {
  console.log(reportData);
  if(!reportData) {
    return <></>
  }
  if (reportData && Object.keys(reportData).length === 0) {
    return <></>;
  }
  const categories = Object.keys(reportData[Object.keys(reportData)[0]]);

  const colors = [
    'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
  ];

  const datasets = Object.keys(reportData).map((modelName, index) => ({
    label: modelName,
    data: categories.map((category) => reportData[modelName][category]),
    backgroundColor: colors[index % colors.length],
    borderColor: colors[index % colors.length].replace('0.6', '1'),
    borderWidth: 1,
  }));

  const data = {
    labels: categories,
    datasets: datasets,
  };

  console.log(data);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'AI Model Performance Across Categories',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categories',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Accuracy (%)',
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
