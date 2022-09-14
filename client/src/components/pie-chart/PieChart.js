import {useState, useEffect, useCallback} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Chart} from "react-google-charts";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import {petitionApi} from "../../api";
import PieChartDepartment from "./Department";

const stateOptions = {
  title: "Petitons Grouped by State",
  pieHole: 0.4,
  is3D: false,
  backgroundColor: "#1b2444",
  legend: {
    textStyle: {color: "#768db7"},
  },
  titleTextStyle: {
    color: "#768db7",
    fontSize: 16,
  },
  showColorCode: true,
  pieSliceTextStyle: {
    color: "black",
  },
  chartArea: {left: 20, top: 50, width: "90%", height: "85%"},
};

const PieChartComponent = ({topic, state, range}) => {
  const [query, setQuery] = useState(topic);
  const [queryValue, setQueryValue] = useState("topic");
  const [stateGrouped, setStateGrouped] = useState(null);
  const [fetchingState, setFetchingState] = useState(false);

  const getStateGroupedData = useCallback(() => {
    setFetchingState(true);
    axios
      .post(`${petitionApi}/fetch/pie-chart/data/state`, {
        query: query,
      })
      .then(res => {
        setStateGrouped(res.data);
        setFetchingState(false);
      })
      .catch(error => {
        console.log(error);
        setFetchingState(false);
        alert("Error loading Petiton Grouped By State Pie-Charts Data");
      });
  }, [query]);

  useEffect(() => {
    getStateGroupedData();
  }, [getStateGroupedData]);

  const stateData = [
    ["State", "Number Of Petitions"],
    ["Open", stateGrouped && stateGrouped.open.length],
    ["Closed", stateGrouped && stateGrouped.closed.length],
    ["Rejected", stateGrouped && stateGrouped.rejected.length],
  ];

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
    <div className="pie-chart-component-container">
      <div className="each-pie-chart-container">
        <div className="each-pie-chart-header-container">
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

        <div className="each-pie-chart-doughnut-container">
          {fetchingState && (
            <div className="pie-chart-loading-container">
              <CircularProgress />
            </div>
          )}
          <Chart
            chartType="PieChart"
            width="100%"
            height="100%"
            data={stateData}
            options={stateOptions}
          />
        </div>
      </div>
      <PieChartDepartment state={state} range={range} />
    </div>
  );
};

export default PieChartComponent;
