import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const y = [6, 7, 4, 5, 3, 6, 0]

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'white',
      }
    }
  },
  scales: {
    y: {
      ticks: {
        color: 'white'
      }
    },
    x:{
      ticks:{
        color: 'white'
      }
    }
  }

};

const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Current Week',
      data: y,
      backgroundColor: '#7F4646',
    }
  ],
};

const BarChart = () => {
    return <Bar options={options} data={data} />;
}
 
export default BarChart;
