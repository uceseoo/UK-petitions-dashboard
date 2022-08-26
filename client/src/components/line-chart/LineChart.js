import {useState, useEffect} from "react";
import CircularProgress from "@mui/material/CircularProgress";
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

import {petitionApi} from "../../api";

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
  const [loadingData, setLoadingData] = useState(false);

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
    setLoadingData(true);
    axios
      .get(`${petitionApi}/fetch/line-chart/data`)
      .then(res => {
        const data = res.data;
        setLabels(data.labels);
        setData(data.chartData);
        //console.log(data.chartData);
        setLoadingData(false);
      })
      .catch(error => {
        console.log(error);
        setLoadingData(false);
        alert("Error fetching line-chart data");
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
      label: Object.keys(obj)[0]
        .replace("Department for ", "")
        .replace("Department of ", ""),
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

  // const datas = {
  //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  //   datasets: [
  //     {
  //       label: "First dataset",
  //       data: [33, 53, 85, 41, 44, 65],
  //       fill: true,
  //       backgroundColor: "rgba(75,192,192,0.2)",
  //       borderColor: "rgba(75,192,192,1)",
  //     },
  //     {
  //       label: "Second dataset",
  //       data: [33, 25, 35, 51, 54, 76],
  //       fill: false,
  //       borderColor: "#742774",
  //     },
  //   ],
  // };

  //console.log(lineChartData);

  return (
    <div className="line-chart-component-container">
      {loadingData && (
        <div className="line-chart-loading-container">
          <CircularProgress />
        </div>
      )}
      <Line
        data={lineChartData}
        options={{
          legend: {
            display: false,
            position: "left",
            labels: {
              fontColor: "#ffffff",
            },
          },
        }}
      />
    </div>
  );
};

export default LineChartComponent;
