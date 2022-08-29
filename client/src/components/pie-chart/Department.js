import {useState, useEffect, useCallback} from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {Chart} from "react-google-charts";
import axios from "axios";

import {petitionApi} from "../../api";

const departmentOptions = {
  title: "Petitions Grouped by Themes",
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

const PieChartDepartment = ({state}) => {
  const [departmentGrouped, setDepartmentGrouped] = useState(null);
  const [fetchingDepartment, setFetchingDepartment] = useState(false);

  const getDepartmentGroupedData = useCallback(() => {
    setFetchingDepartment(true);
    axios
      .post(`${petitionApi}/fetch/pie-chart/data/department`, {query: state})
      .then(res => {
        // console.log(res.data);
        setDepartmentGrouped(res.data);
        setFetchingDepartment(false);
      })
      .catch(error => {
        console.log(error);
        setFetchingDepartment(false);
        alert("Error loading Petiton Grouped By Department Pie-Charts Data");
      });
  }, [state]);

  useEffect(() => {
    getDepartmentGroupedData();
  }, [getDepartmentGroupedData]);

  const departmentData = [
    ["Department", "Number of Petitions"],
    [
      "Home Office",
      departmentGrouped && departmentGrouped["Home Office"]?.length,
    ],
    [
      "Business, Energy and Industrial Strategy",
      departmentGrouped &&
        departmentGrouped["Business, Energy and Industrial Strategy"]?.length,
    ],
    [
      "Digital, Culture, Media and Sport",
      departmentGrouped &&
        departmentGrouped["Digital, Culture, Media and Sport"]?.length,
    ],
    ["Transport", departmentGrouped && departmentGrouped["Transport"]?.length],
    [
      "Health and Social Care",
      departmentGrouped && departmentGrouped["Health and Social Care"]?.length,
    ],
    ["Education", departmentGrouped && departmentGrouped["Education"]?.length],

    [
      "Foreign, Commonwealth & Development Office",
      departmentGrouped &&
        departmentGrouped["Foreign, Commonwealth & Development Office"]?.length,
    ],

    [
      "Ministry of Justice",
      departmentGrouped && departmentGrouped["Ministry of Justice"]?.length,
    ],

    [
      "HM Treasury",
      departmentGrouped && departmentGrouped["HM Treasury"]?.length,
    ],
    [
      "Cabinet Office",
      departmentGrouped && departmentGrouped["Cabinet Office"]?.length,
    ],
    [
      "International Trade",
      departmentGrouped && departmentGrouped["International Trade"]?.length,
    ],
    [
      "Levelling Up, Housing and Communities",
      departmentGrouped &&
        departmentGrouped["Levelling Up, Housing and Communities "]?.length,
    ],
    [
      "Environment, Food and Rural Affairs",
      departmentGrouped &&
        departmentGrouped["Environment, Food and Rural Affairs"]?.length,
    ],
    [
      "Work and Pensions",
      departmentGrouped && departmentGrouped["Work and Pensions"]?.length,
    ],
    [
      "Office of the Leader of the House of Commons",
      departmentGrouped &&
        departmentGrouped["Office of the Leader of the House of Commons"]
          ?.length,
    ],
    [
      "Ministry of Defence",
      departmentGrouped && departmentGrouped["Ministry of Defence"]?.length,
    ],
    [
      "Office of the Secretary of State for Wales",
      departmentGrouped &&
        departmentGrouped["Office of the Secretary of State for Wales"]?.length,
    ],
    [
      "Office of the Secretary of State for Scotland",
      departmentGrouped &&
        departmentGrouped["Office of the Secretary of State for Scotland"]
          ?.length,
    ],
    [
      "Northern Ireland Office",
      departmentGrouped && departmentGrouped["Northern Ireland Office"]?.length,
    ],
    [
      "Attorney General's Office",
      departmentGrouped &&
        departmentGrouped["Attorney General's Office"]?.length,
    ],
    // [
    //   "Unknown Topic",
    //   departmentGrouped && departmentGrouped["Unknown Topic"]?.length,
    // ],
  ];

  return (
    <div className="each-pie-chart-container">
      <div className="each-pie-chart-doughnut-container">
        {fetchingDepartment && (
          <div className="pie-chart-loading-container">
            <CircularProgress />
          </div>
        )}
        <Chart
          chartType="PieChart"
          width="100%"
          height="100%"
          data={departmentData}
          options={departmentOptions}
        />
      </div>
    </div>
  );
};

export default PieChartDepartment;
