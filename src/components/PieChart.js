import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { label: 'Group A', value: 400 },
  { label: 'Group B', value: 300 },
  { label: 'Group C', value: 300 },
  { label: 'Group D', value: 200 },
  { label: 'Group E', value: 278 },
  { label: 'Group F', value: 189 },
  { label: 'Group G', value: 200 },
  { label: 'Group H', value: 278 },
  { label: 'Group I', value: 189 },
];

export default function StraightAnglePieChart() {
  return (
    <PieChart
      series={[
        {
         data,
        },
      ]}
      height={300}
    />
  );
}
