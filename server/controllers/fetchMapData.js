import {readFile} from "fs/promises";

const petitions = JSON.parse(
  await readFile(new URL("../petitions.json", import.meta.url))
);

const ukConstituenciesGeoJson = JSON.parse(
  await readFile(new URL("../constituencies_geojson.json", import.meta.url))
);

const filteredPetitions = petitions.filter(
  petition => petition.self !== undefined
);

const updatedPetitionsTopic = filteredPetitions.map(petition => {
  return {
    ...petition,
    topic: petition.departments[0]?.name.replace("Department for ", ""),
  };
});

//FUNCTION TO RETURN DATA BASED ON TOPIC/DEPARTMENT SELECTED
export const fetchMapData = (req, res) => {
  const petitionTopic = req.params.topic;

  //console.log(petitionTopic);

  if (!petitionTopic)
    return res.status(404).json({message: "Please add a Topic"});

  //const petitionTopic = "Home Office";

  const selectedPetitions = updatedPetitionsTopic.filter(
    petition => petition?.topic?.toLowerCase() === petitionTopic.toLowerCase()
  );

  const signaturesByConstituencies = selectedPetitions.map(
    a => a.signatures_by_constituency
  );

  const groupedSignaturesByConstituencies = signaturesByConstituencies.flat(1);

  const addedUpConstituenciesObject = groupedSignaturesByConstituencies.reduce(
    function (c, x) {
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
    },
    {}
  );

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

  //const data = { topic : petitionTopic }

  res.status(201).json(mapGeoJsonData);
};
