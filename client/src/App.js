import {useState} from "react";
import "./styles/styles.scss";

import {
  NavbarComponent,
  FilterComponent,
  MapComponent,
  LineChartComponent,
  BarGraphComponent,
  PieChartComponent,
  HeaderComponent,
} from "./components";

import GetDataComponent from "./components/GetData";

function App() {
  const [rangeValue, setRangeValue] = useState([2020, 2022]);
  const [petitionTopic, setPetitionTopic] = useState("Home Office");
  return (
    <div className="application-container">
      <div className="application-inner-container">
        <NavbarComponent />

        <FilterComponent
          petitionTopic={petitionTopic}
          setPetitionTopic={setPetitionTopic}
          rangeValue={rangeValue}
          setRangeValue={setRangeValue}
        />

        <HeaderComponent />

        <div className="map-chart-grouped-container">
          <MapComponent petitionTopic={petitionTopic} />

          <div className="application-grouped-chart">
            <BarGraphComponent range={rangeValue} topic={petitionTopic} />
            <LineChartComponent />
          </div>
        </div>

        <PieChartComponent topic={petitionTopic} />

        {/* <GetDataComponent /> */}
      </div>
    </div>
  );
}

export default App;
