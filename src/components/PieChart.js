import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const StraightAnglePieChart = ({ data }) => {
  const chartData = [
    { label: 'On-going', value: data['On-going'], color: 'green' }, //
    { label: 'Completed', value: data['Completed'] }, //, color: 'green'
  ];

  return (
    <PieChart
      series={[
        {
          data: chartData,
          paddingAngle: 5,
          innerRadius: 80,
          outerRadius: 150,
        },
      ]}
      height={300}
    />
  );
};

export default StraightAnglePieChart;
