import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ReservationsChart({ data, lable }) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(() => {
    const processData = () => {
      const dates = data.map((item) => new Date(item.timestamp).toLocaleDateString());
      const seats = data.map((item) => item.seats);

      setChartData({
        labels: dates,
        datasets: [
          {
            label: lable,
            data: seats,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    };

    processData();
  }, [data]);

  return <Line data={chartData} />;
}
