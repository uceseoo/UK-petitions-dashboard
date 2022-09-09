import axios from "axios";
import Papa from "papaparse";

export const getPetitionCount = (req, res) => {
  const state = req.params.state;

  const path = `https://petition.parliament.uk/petitions.csv?state=${state}`;
  axios
    .get(path)
    .then(result => {
      const count = Papa.parse(result.data);
      return res.status(200).json({count: count.data.length - 2});
    })
    .catch(error => {
      console.log(error);
      return res.status(404).json(error);
    });
};
