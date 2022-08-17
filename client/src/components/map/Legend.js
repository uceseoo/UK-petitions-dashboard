import {useEffect} from "react";
import {useMap} from "react-leaflet";
import L from "leaflet";
import "leaflet-choropleth";

function getColor(d) {
  return d > 3
    ? "#800026"
    : d > 2.5
    ? "#BD0026"
    : d > 2
    ? "#E31A1C"
    : d > 1.5
    ? "#FC4E2A"
    : d > 1
    ? "#FD8D3C"
    : d > 0.5
    ? "#FEB24C"
    : d > 0
    ? "#FED976"
    : "#FFEDA0";
}

const Legend = () => {
  const grades = [
    {
      start: 0.0,
      end: 0.5,
      color: "#FEB24C",
    },
    {
      start: 0.5,
      end: 1.0,
      color: "#FD8D3C",
    },
    {
      start: 1.0,
      end: 1.5,
      color: "#FC4E2A",
    },
    {
      start: 1.5,
      end: 2.5,
      color: "#E31A1C",
    },
    {
      start: 2.5,
      end: 3.0,
      color: "#BD0026",
    },
    {
      start: "3+",
      end: null,
      color: "#BD0026",
    },
  ];

  return (
    <div className="map-legend-container">
      <h1>Importance</h1>
      <div className="legend-grades-container">
        {grades.map((grade, index) => {
          return (
            <div className="each-grade-container" key={index}>
              <div
                className="grade-color-box"
                style={{backgroundColor: `${grade.color}`}}
              />
              <p>
                {grade.start} {grade.end && "-"} {grade.end}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Legend;
