import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const StatisticalChart = ({ data, label, name }) => {
  const defaultData = {
    labels: label,
    datasets: [
      {
        label: 'Thống kê user',
        fill: false,
        lineTension: 0.1,
        backgroundColor: ['green', 'rgba(54, 162, 235, 0.2)', 'red', 'yellow', 'blue', 'rgba(153, 102, 255, 1)'],
        borderColor: ['green', 'rgba(54, 162, 235, 0.2)', 'red', 'yellow', 'blue', 'rgba(153, 102, 255, 1)'],
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data
      }
    ]
  };

  return (
    <>
      <Doughnut height={100} data={defaultData} />
      <h4 style={{ textAlign: 'center', padding: '5px' }}>{name}</h4>
    </>
  );
};

export default React.memo(StatisticalChart);
