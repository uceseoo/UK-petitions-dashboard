import axios from "axios";

const GetDataComponent = () => {
  const getData = () => {
    //console.log("fetching data");

    axios
      .get("http://localhost:5000/petition/add")
      .then(res => {
        const result = res.data;
        //console.log("data fetched successfully");
        console.log(result);
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
