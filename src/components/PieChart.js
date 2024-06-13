import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const StraightAnglePieChart = ({ data }) => {
  const chartData = [
    { label: 'On-going', value: data['On-going'], color: 'blue' },
    { label: 'Completed', value: data['Completed' ],color: 'green' },
  ];
<style>
  
</style>
  return (
    <PieChart
      series={[
        { data: chartData },
      ]}
      height={300}
    />
  );
};

export default StraightAnglePieChart;
