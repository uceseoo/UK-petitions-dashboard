import {useState, useEffect} from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Legend,
} from "chart.js";

import {Line} from "react-chartjs-2";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Legend
);

const LineChartComponent = () => {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  const colours = [
    "#a2d2ff",
    "#cdb4db",
    "#264653",
    "#f4a261",
    "#606c38",
    "#ffb4a2",
    "#000000",
    "#ffd60a",
    "#4361ee",
    "#f72585",
    "#8e9aaf",
    "#38a3a5",
    "#c7f9cc",
    "#ffffff",
    "#ff70a6",
    "#e7ecef",
    "#ffc9b9",
    "#a47148",
    "#583101",
    "#9a48d0",
    "#ccff33",
  ];

  //RETURN A RANDOM COLOUR TO USE WITH LINE CHART
  function getRandomColor() {
    const num = Math.floor(Math.random() * 10); // get a random number between 0-9
    return colours[num];
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/petition/fetch/line-chart/data")
      .then(res => {
        const data = res.data;
        setLabels(data.labels);
        setData(data.chartData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const chartData = data.map(obj => {
    const lineData = Object.entries(obj).map(([key, value]) => {
      return Object.entries(value).map(([key, value]) => {
        return value.length;
      });
    });

    const randomColor = getRandomColor();

    const data = {
      label: Object.keys(obj)[0].replace("Department for ", ""),
      data: lineData[0],
      backgroundColor: randomColor,
      borderColor: randomColor,
    };
    return data;
  });

  // console.log(chartData[0]);

  const lineChartData = {
    labels: labels,
    datasets: chartData,
  };

  return (
    <div className="line-chart-component-container">
      <Line
        data={lineChartData}
        options={{
          legend: {
            display: true,
            position: "right",
            align: "center",
            fontFamily: "Allianz-Neo",
            textDirection: "ltr",
            labels: {
              usePointStyle: true,
              fontColor: "#006192",
            },
          },
        }}
      />
    </div>
  );
};

export default LineChartComponent;
