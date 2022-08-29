import {readFile} from "fs/promises";
import Petition from "../models/petition.js";

const ukConstituenciesGeoJson = JSON.parse(
  await readFile(new URL("../constituencies_geojson.json", import.meta.url))
);

//FUNCTION TO RETURN DATA BASED ON TOPIC/DEPARTMENT SELECTED
export const fetchMapData = (req, res) => {
  const petitionTopic = req.params.topic;

  if (!petitionTopic)
    return res.status(404).json({message: "Please add a Topic"});

  Petition.find({topic: petitionTopic})
    .lean()
    .then(selectedPetitions => {
      const signaturesByConstituencies = selectedPetitions.map(
        a => a.signatures_by_constituency
      );

      const groupedSignaturesByConstituencies =
        signaturesByConstituencies.flat(1);

      const addedUpConstituenciesObject =
        groupedSignaturesByConstituencies.reduce(function (c, x) {
          if (!c[x?.name])
            c[x?.name] = {
              name: x?.name,
              mp: x?.mp,
              ons_code: x?.ons_code,
              total_importance: 0,
              total_signature_count: 0,
            };
          c[x?.name].total_importance += Number(x?.importance);
          c[x?.name].total_signature_count += Number(x?.signature_count);
          return c;
        }, {});

      const addedUpConstituenciesArray = [];
      for (let name in addedUpConstituenciesObject) {
        addedUpConstituenciesArray.push(addedUpConstituenciesObject[name]);
      }

      const geoJsonFeatures = ukConstituenciesGeoJson.features;

      const mergeFeaturesToConstituencies = (a1, a2) =>
        a1.map(item1 => ({
          ...item1,
          properties: a2.find(item2 =>
            item1?.properties?.PCON13CD === item2.ons_code
              ? {...item1.properties, ...item2}
              : null
          ),
        }));

      const mergedData = mergeFeaturesToConstituencies(
        geoJsonFeatures,
        addedUpConstituenciesArray
      );

      const mapGeoJsonData = {
        type: "FeatureCollection",
        features: mergedData,
      };

      return res.status(201).json(mapGeoJsonData);
    })

    .catch(error => {
      return res.status(409).json({error: error});
    });
};
