import {useEffect, useState} from "react";
import axios from "axios";
import {Bar} from "react-chartjs-2";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

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
      position: "top",
      display: false,
    },

    title: {
      display: true,
      text: "Debated Petitons/Year",
    },
  },
};

const BarGraphComponent = ({range, topic}) => {
  const [labels, setLabels] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [query, setQuery] = useState("all");
  const [queryValue, setQueryValue] = useState("all");

  useEffect(() => {
    setFetching(true);
    //CONVERTS RANGE VALUE FROM FILTER COMPONENT WHICH IS AN ARRAY OF NUMBER TO ARRAY OF STRING
    const rangeString = range.map(num => {
      return String(num);
    });

    axios
      .post("http://localhost:5000/petition/fetch/bar-graph/data", {
        range: rangeString,
        query: query,
      })
      .then(res => {
        const data = res.data;
        //console.log(data);
        setLabels(data.labels);
        setGraphData(data.graphData);
        setFetching(false);
      })
      .catch(error => {
        console.log(error);
        setFetching(false);
      });
  }, [range, query]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Petitions",
        data: graphData,
        backgroundColor: ["rgba(255, 99, 132, 0.9)"],
      },
    ],
  };

  const handleQueryChange = event => {
    const value = event.target.value;

    setQueryValue(value);

    if (value === "topic") {
      setQuery(topic);
    } else {
      setQuery("all");
    }
  };

  return (
    <div className="bar-graph-component-container">
      <div className="bar-graph-component-header-container">
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={handleQueryChange}
          value={queryValue}
        >
          <FormControlLabel
            value="all"
            control={<Radio />}
            label="All petitions"
          />
          <FormControlLabel
            value="topic"
            control={<Radio />}
            label={`${topic} petitons`}
          />
        </RadioGroup>
      </div>
      <div className="bar-graph-component-graph-container">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default BarGraphComponent;
