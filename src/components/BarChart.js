import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({week, user}) => {
  let y = []
  const hoursToGraph = user.hours.filter(hour => hour.weekNumber === week)
    
    if(hoursToGraph !== undefined){
      hoursToGraph.forEach((hour) =>{
        y.push(hour.hoursWorked)
      })
    }
  
  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const options = {
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
  const data = {
    labels,
    datasets: [
      {
        label: 'Current Week',
        data: y,
        backgroundColor: '#7F4646',
      }
    ],
  };


    return <Bar options={options} data={data} />;
}
 
export default BarChart;
