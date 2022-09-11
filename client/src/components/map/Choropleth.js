import {useEffect, useState, useCallback} from "react";
import {useMap} from "react-leaflet";
import L from "leaflet";
import "leaflet-choropleth";
import axios from "axios";

import {petitionApi} from "../../api";

const Choropleth = ({petitionTopic, setLoading}) => {
  const [data, setData] = useState(null);
  const map = useMap();

  const getGeoJsonData = useCallback(() => {
    setLoading(true);
    axios
      .get(`${petitionApi}/get/map/geojson/${petitionTopic}`)
      .then(res => {
        const data = res.data;
        setData(data);
        setLoading(false);
        //console.log(data);
      })
      .catch(error => {
        //console.log(error);
        setLoading(false);
      });
    //console.log("map disabled");
  }, [petitionTopic, setLoading]);

  useEffect(() => {
    getGeoJsonData();
  }, [getGeoJsonData]);

  const getColor = d => {
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
  };

  const style = useCallback(feature => {
    //console.log(feature);
    return {
      fillColor: getColor(
        feature.properties ? feature.properties.total_importance : 0
      ),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  }, []);

  useEffect(() => {
    if (data === null) return;

    //map.scrollWheelZoom.disable();

    map.createPane("labels");

    map.getPane("labels").style.zIndex = 650;

    map.getPane("labels").style.pointerEvents = "none";

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
      {
        //attribution: "©OpenStreetMap, ©CartoDB",
        pane: "labels",
        className: "map-tiles",
      }
    ).addTo(map);

    L.geoJson(data, {
      style: style,
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          `<p>Name : ${
            feature.properties ? feature.properties.name : "Unknown"
          } </p>` +
            `<p>ONS Code : ${
              feature.properties ? feature.properties.ons_code : "Unknown"
            } </p>` +
            `<p>MP : ${
              feature.properties ? feature.properties.mp : "Unknown"
            }</p>` +
            `<p>Importance : ${
              feature.properties?.total_importance
                ? feature.properties.total_importance
                : "Unknown"
            }</p>` +
            `<p>Signatures : ${
              feature.properties
                ? feature.properties.total_signature_count
                : "Unknown"
            }</p>`
        );

        layer.on("mouseover", function () {
          layer
            .bindPopup(
              `<p>Name : ${
                feature.properties ? feature.properties.name : "Unknown"
              } </p>` +
                `<p>ONS Code : ${
                  feature.properties ? feature.properties.ons_code : "Unknown"
                } </p>` +
                `<p>MP : ${
                  feature.properties ? feature.properties.mp : "Unknown"
                }</p>` +
                `<p>Importance : ${
                  feature.properties?.total_importance
                    ? feature.properties.total_importance
                    : "Unknown"
                }</p>` +
                `<p>Signatures : ${
                  feature.properties
                    ? feature.properties.total_signature_count
                    : "Unknown"
                }</p>`
            )
            .openPopup();
        });
      },
    }).addTo(map);
  }, [data, map, style]);

  return null;
};

export default Choropleth;
