import {useState} from "react";
import CircularProgress from "@mui/material/CircularProgress";

import "./styles/styles.scss";

import {
  NavbarComponent,
  FilterComponent,
  MapComponent,
  LineChartComponent,
  BarGraphComponent,
  PieChartComponent,
  HeaderComponent,
  AboutComponent,
  UpdateAppComponent,
} from "./components";

function App() {
  const [rangeValue, setRangeValue] = useState([2020, 2022]);
  const [petitionTopic, setPetitionTopic] = useState("Home Office");
  const [petitionState, setPetitionState] = useState("all");
  const [showAbout, setShowAbout] = useState(false);
  const [updatingApp, setUpdatingApp] = useState(false);

  if (updatingApp)
    return (
      <div className="updating-app-loader-container">
        <CircularProgress />
        <p>Updating Petitions</p>
      </div>
    );
  return (
    <div className="application-container">
      <div className="application-inner-container">
        <NavbarComponent setShowAbout={setShowAbout} />

        <FilterComponent
          petitionTopic={petitionTopic}
          setPetitionTopic={setPetitionTopic}
          rangeValue={rangeValue}
          setRangeValue={setRangeValue}
          petitionState={petitionState}
          setPetitionState={setPetitionState}
        />

        <HeaderComponent />

        <div className="map-chart-grouped-container">
          <MapComponent petitionTopic={petitionTopic} />

          <div className="application-grouped-chart">
            <BarGraphComponent range={rangeValue} topic={petitionTopic} />
            <LineChartComponent />
          </div>
        </div>

        <PieChartComponent topic={petitionTopic} state={petitionState} />

        <UpdateAppComponent setUpdatingApp={setUpdatingApp} />
      </div>

      <AboutComponent showAbout={showAbout} setShowAbout={setShowAbout} />
    </div>
  );
}

export default App;
