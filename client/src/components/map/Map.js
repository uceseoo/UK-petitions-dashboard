import {useState} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import CircularProgress from "@mui/material/CircularProgress";

import Choropleth from "./Choropleth";
import Legend from "./legend/Legend";

const position = [55.3781, -5.436];

const MapComponent = ({petitionTopic}) => {
  const [fetchingPetition, setFetchingPetition] = useState(false);
  return (
    <div className="map-component-container">
      <div className="map-component-inner-container">
        <div className="map-component-header-container">
          <h1>
            Displaying Distribution of Interest in {petitionTopic} Petitions
          </h1>
        </div>
        <div className="map-component-content-container">
          {fetchingPetition && (
            <div className="map-component-loading-container">
              <CircularProgress />
            </div>
          )}
          <Legend />
          <MapContainer
            center={position}
            zoom={5}
            style={{height: "100%", width: "100%"}}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Choropleth
              petitionTopic={petitionTopic}
              setLoading={setFetchingPetition}
            />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
