import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useThemeStore } from '../../store/theme';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  labels: string[];
  data: number[];
  label: string;
}

function LineChart({ labels, data, label }: LineChartProps) {
  const { colors, isDark } = useThemeStore();

  const chartData = {
    labels,
    datasets: [
      {
        label,
        data,
        borderColor: colors.primary,
        backgroundColor: colors.primary + '20',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: isDark ? '#fff' : '#000',
          boxWidth: 20,
          padding: 15,
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
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? '#ffffff10' : '#00000010',
        },
        ticks: {
          color: isDark ? '#fff' : '#000',
          padding: 8,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? '#fff' : '#000',
          maxRotation: 45,
          minRotation: 45,
          padding: 8,
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
}

export default LineChart;