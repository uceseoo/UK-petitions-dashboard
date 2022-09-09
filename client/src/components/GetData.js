import axios from "axios";

import Papa from "papaparse";

//import csvToJson from "convert-csv-to-json";

const path = "http://localhost:5000/petition/get/data";

const GetDataComponent = () => {
  const getData = () => {
    //console.log("fetching data");

    axios
      .get(path)
      .then(res => {
        const result = res.data;

        const newResult = Papa.parse(result);

        console.log(newResult);
      })
      .catch(error => {
        console.log("error whilst fetching data");
        console.log(error);
      });
  };

  return (
    <div>
      <button onClick={getData}>Fetch Data</button>
    </div>
  );
};

export default GetDataComponent;
