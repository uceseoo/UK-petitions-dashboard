//import moment from "moment";
import mongoose from "mongoose";
//import petitions from "../petitions.json" assert {type: "json"};

import {readFile, writeFile} from "fs/promises";

const petitions = JSON.parse(
  await readFile(new URL("../petitions.json", import.meta.url))
);

// const constituencies = JSON.parse(
//   await readFile(new URL("../constituencies_geojson.json", import.meta.url))
// );

const filteredPetition = petitions.filter(
  petition => petition.self !== undefined
);

// const homeOfficePetitions = filteredPetition.filter(
//   petition => petition.departments[0]?.name === "Department for Education"
// );

// const signaturesByConstituencies = homeOfficePetitions.map(
//   a => a.signatures_by_constituency
// );

// const departments = filteredPetition.map(a => a.departments[0]?.name);

// //const states = filteredPetition.map(a => a.state);

// const years = filteredPetition.map(a => a.created_at);

// const uniqueChars = years.filter((c, index) => {
//   return years.indexOf(c) === index;
// });

// //console.log(departments[0])

// //const flattenArray =  [].concat.apply([], signaturesByConstituencies);

// const flattenArray = signaturesByConstituencies.flat(1);

// const addedUpObject = flattenArray.reduce(function (c, x) {
//   if (!c[x?.name])
//     c[x?.name] = {
//       name: x?.name,
//       mp: x?.mp,
//       ons_code: x?.ons_code,
//       total_importance: 0,
//       total_signature_count: 0,
//     };
//   c[x?.name].total_importance += Number(x?.importance);
//   c[x?.name].total_signature_count += Number(x?.signature_count);
//   return c;
// }, {});

// const addedUpArray = [];
// for (let name in addedUpObject) {
//   addedUpArray.push(addedUpObject[name]);
// }

// const features = constituencies.features;

// const mergeByConstituency = (a1, a2) =>
//   a1.map(item1 => ({
//     ...item1,
//     properties: a2.find(item2 =>
//       item1?.properties?.PCON13CD === item2.ons_code
//         ? {...item1.properties, ...item2}
//         : null
//     ),
//   }));

// const mergedData = mergeByConstituency(features, addedUpArray);

export const addPetition = (req, res) => {
  // const geoJsonData = {
  //   type: "FeatureCollection",
  //   features: mergedData,
  // };
  // const data = JSON.stringify(filteredPetition);

  // writeFile("petitions.json", filteredPetition, err => {
  //   if (err) throw err;

  //   //const result = geoJsonData;
  //   res.status(200).json({message: "Petition Created"});
  // });

  const result = {
    petitions: petitions[0],
    filteredPetition: filteredPetition[0],
  };
  res.status(200).json(result);
};

///////// UNUSED CODE DATA BELOW *********************************

// //Sum up all the same taxid tax_value
// var temp = {};
// flattenArray.forEach(function (obj) {
//   if (!temp[obj?.name]) {
//     temp[obj?.name] = obj?.importance;
//   } else {
//     temp[obj?.name] = Number(temp[obj?.name]) + Number(obj?.importance);
//   }
// });

// const getRemainingData = name => {
//   const object = flattenArray.find(obj => obj?.name === name);

//   return object;
// };

// //Format the data into desired output
// const results = [];
// for (var key in temp) {
//   results.push({
//     name: key,
//     ...getRemainingData(key),
//     signature_count: temp[key],
//     importance: temp[key],
//   });
// }
