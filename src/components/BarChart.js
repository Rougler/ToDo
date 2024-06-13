import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const SimpleBarChart = (props) => {
  const { tasks } = props;

  const taskCounts = {};

  tasks.forEach((task) => {
    task.assignedTo.forEach((person) => {
      if (!taskCounts[person]) {
        taskCounts[person] = {
          "On-going": 0,
          "Completed": 0,
        };
      }
      taskCounts[person][task.taskStatus] += 1;
    });
  });

  const dataLabels = Object.keys(taskCounts);
  const ongoingData = dataLabels.map((label) => taskCounts[label]["On-going"]);
  const completedData = dataLabels.map((label) => taskCounts[label]["Completed"]);

  return (
    <BarChart
      
      height={300}
      series={[
        { data: ongoingData, label: 'On-going', id: 'ongoingId' },
        { data: completedData, label: 'Completed', id: 'completedId' },
      ]}
      xAxis={[{ data: dataLabels, scaleType: 'band' }]}
    />
  );
};

export default SimpleBarChart;
