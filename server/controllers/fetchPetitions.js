import Petition from "../models/petition.js";

export const fetchPetitions = (req, res) => {
  const {query} = req.body;

  Petition.aggregate([
    {$unset: "signatures_by_constituency"},
    {$match: {state: query}},
  ])
    .then(petitions => {
      res.status(200).json(petitions);
    })
    .catch(error => {
      res.status(404).json({error: error});
      console.log(error);
    });
};
