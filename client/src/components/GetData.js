import axios from "axios";

const GetDataComponent = () => {
  const getData = () => {
    //console.log("fetching data");

    axios
      .post("http://localhost:5000/petition/fetch/bar-graph/data", {
        range: [],
        query: "Home Office",
      })
      .then(res => {
        const data = res.data;
        console.log(data);
      })
      .catch(error => {
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
