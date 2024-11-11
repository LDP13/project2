import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useThemeStore } from '../../store/theme';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  labels: string[];
  data: number[];
}

function DoughnutChart({ labels, data }: DoughnutChartProps) {
  const { isDark } = useThemeStore();

  const generateColors = (count: number) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = (360 / count) * i;
      colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
  };

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: generateColors(data.length),
        borderColor: isDark ? '#1e293b' : '#ffffff',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: isDark ? '#fff' : '#000',
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1e293b' : 'white',
        titleColor: isDark ? '#fff' : '#000',
        bodyColor: isDark ? '#fff' : '#000',
        borderColor: isDark ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        padding: 10,
      },
    },
    cutout: '60%',
  };

  return <Doughnut data={chartData} options={options} />;
}

export default DoughnutChart;