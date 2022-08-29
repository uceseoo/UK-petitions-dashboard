import moment from "moment";

import Petition from "../models/petition.js";

export const fetchBarGraphData = (req, res) => {
  const query = req.body.query;
  const range = req.body.range;

  if (!query) return res.status(404).json({message: "Add Query"});

  if (query.toLowerCase() === "all") {
    Petition.aggregate([{$unset: "signatures_by_constituency"}])
      .then(petitions => {
        const editPetitionsYear = petitions.map(petition => {
          return {
            ...petition,
            created_at: moment(petition.created_at).format("YYYY"),
          };
        });

        const debatedPetitions = editPetitionsYear.filter(
          petition => petition.state === "closed"
        );

        const filteredPetitionsByYearRange = debatedPetitions.filter(petition =>
          range.includes(petition.created_at)
        );

        const groupPetitionsByYear = filteredPetitionsByYearRange.reduce(
          (r, a) => {
            r[a.created_at] = r[a.created_at] || [];
            r[a.created_at].push(a);
            return r;
          },
          Object.create(null)
        );

        const data = {
          labels: range,
          graphData: range.map(label => {
            return groupPetitionsByYear[`${label}`]?.length;
          }),
        };
        return res.status(201).json(data);
      })
      .catch(error => {
        return res.status(409).json({error: error});
      });
  }
  //IF QUERY ISN'T INCLUDED.........
  else {
    Petition.aggregate([
      {$match: {topic: query}},
      {$unset: "signatures_by_constituency"},
    ])
      .then(petitions => {
        const editPetitionsYear = petitions.map(petition => {
          return {
            ...petition,
            created_at: moment(petition.created_at).format("YYYY"),
          };
        });

        const debatedPetitions = editPetitionsYear.filter(
          petition => petition.state === "closed"
        );

        const filteredPetitionsByYearRange = debatedPetitions.filter(petition =>
          range.includes(petition.created_at)
        );

        const groupPetitionsByYear = filteredPetitionsByYearRange.reduce(
          (r, a) => {
            r[a.created_at] = r[a.created_at] || [];
            r[a.created_at].push(a);
            return r;
          },
          Object.create(null)
        );

        const data = {
          labels: range,
          graphData: range.map(label => {
            return groupPetitionsByYear[`${label}`]?.length;
          }),
        };
        return res.status(201).json(data);
      })
      .catch(error => {
        return res.status(409).json({error: error});
      });
  }
};
