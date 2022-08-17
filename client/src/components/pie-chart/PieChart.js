import {useState, useEffect} from "react";
//import {PieChart} from "react-minimal-pie-chart";
import {Chart} from "react-google-charts";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

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

const departmentOptions = {
  title: "Petitons Grouped by Departments",
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

const PieChartComponent = ({topic}) => {
  const [query, setQuery] = useState("all");
  const [queryValue, setQueryValue] = useState("all");
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:5000/petition/fetch/petitions", {query: query})
      .then(res => {
        setData(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [query]);

  const stateData = [
    ["State", "Number Of Petitions"],
    ["Open", data && data.state_grouped.open.length],
    ["Closed", data && data.state_grouped.closed.length],
    ["Rejected", data && data.state_grouped.rejected.length],
  ];

  const departmentData = [
    ["Department", "Number of Petitions"],
    ["Home Office", data && data.department_grouped["Home Office"].length],
    [
      "Business, Energy and Industrial Strategy",
      data &&
        data.department_grouped[
          "Department for Business, Energy and Industrial Strategy"
        ].length,
    ],
    [
      "Digital, Culture, Media and Sport",
      data &&
        data.department_grouped[
          "Department for Digital, Culture, Media and Sport"
        ].length,
    ],
    [
      "Transport",
      data && data.department_grouped["Department for Transport"].length,
    ],
    [
      "Department of Health and Social Care",
      data &&
        data.department_grouped["Department of Health and Social Care"].length,
    ],
    [
      "Education",
      data && data.department_grouped["Department for Education"].length,
    ],

    [
      "Foreign, Commonwealth & Development Office",
      data &&
        data.department_grouped["Foreign, Commonwealth & Development Office"]
          .length,
    ],

    [
      "Ministry of Justice",
      data && data.department_grouped["Ministry of Justice"].length,
    ],
    ///

    ["HM Treasury", data && data.department_grouped["HM Treasury"].length],
    [
      "Cabinet Office",
      data && data.department_grouped["Cabinet Office"].length,
    ],
    [
      "International Trade",
      data &&
        data.department_grouped["Department for International Trade"].length,
    ],
    [
      "Levelling Up, Housing and Communities",
      data &&
        data.department_grouped[
          "Department for Levelling Up, Housing and Communities "
        ].length,
    ],
    [
      "Environment, Food and Rural Affairs",
      data &&
        data.department_grouped[
          "Department for Environment, Food and Rural Affairs"
        ].length,
    ],
    [
      "Work and Pensions",
      data &&
        data.department_grouped["Department for Work and Pensions"].length,
    ],
    [
      "Office of the Leader of the House of Commons",
      data &&
        data.department_grouped["Office of the Leader of the House of Commons"]
          .length,
    ],
    [
      "Ministry of Defence",
      data && data.department_grouped["Ministry of Defence"].length,
    ],
    [
      "Office of the Secretary of State for Wales",
      data &&
        data.department_grouped["Office of the Secretary of State for Wales"]
          .length,
    ],
    [
      "Office of the Secretary of State for Scotland",
      data &&
        data.department_grouped["Office of the Secretary of State for Scotland"]
          .length,
    ],
    [
      "Northern Ireland Office",
      data && data.department_grouped["Northern Ireland Office"].length,
    ],
    [
      "Attorney General's Office",
      data && data.department_grouped["Attorney General's Office"].length,
    ],
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
          <Chart
            chartType="PieChart"
            width="100%"
            height="100%"
            data={stateData}
            options={stateOptions}
          />
        </div>
      </div>
      <div className="each-pie-chart-container">
        <div className="each-pie-chart-doughnut-container">
          <Chart
            chartType="PieChart"
            width="100%"
            height="100%"
            data={departmentData}
            options={departmentOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default PieChartComponent;
