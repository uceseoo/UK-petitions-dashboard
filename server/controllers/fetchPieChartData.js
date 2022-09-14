import Petition from "../models/petition.js";
import moment from "moment";

export const groupedByState = (req, res) => {
  const query = req.body.query;

  if (query.toLowerCase() === "all") {
    Petition.aggregate([{$unset: "signatures_by_constituency"}])
      .then(petitions => {
        const groupPetitionByState = petitions.reduce((r, a) => {
          r[a.state] = r[a.state] || [];
          r[a.state].push(a);
          return r;
        }, Object.create(null));

        const data = groupPetitionByState;
        return res.status(201).json(data);
      })
      .catch(error => {
        return res.status(409).json({error: error});
      });
  } else {
    Petition.aggregate([
      {$match: {topic: query}},
      {$unset: "signatures_by_constituency"},
    ])
      .then(petitions => {
        const groupPetitionByState = petitions.reduce((r, a) => {
          r[a.state] = r[a.state] || [];
          r[a.state].push(a);
          return r;
        }, Object.create(null));

        const data = groupPetitionByState;
        return res.status(201).json(data);
      })
      .catch(error => {
        return res.status(409).json({error: error});
      });
  }
};

export const groupedByDepartment = (req, res) => {
  const {query} = req.body;
  const {range} = req.body;
  if (query === "all") {
    Petition.aggregate([{$unset: "signatures_by_constituency"}])
      .then(petitions => {
        const editPetitionsYear = petitions.map(petition => {
          return {
            ...petition,
            created_at: moment(petition.closed_at).format("YYYY"),
          };
        });

        const selectedPetitions = editPetitionsYear.filter(petition =>
          range.includes(petition.created_at)
        );
        const groupPetitionByDepartMent = selectedPetitions.reduce((r, a) => {
          r[a.topic] = r[a.topic] || [];
          r[a.topic].push(a);
          return r;
        }, Object.create(null));

        const data = groupPetitionByDepartMent;
        return res.status(201).json(data);
      })
      .catch(error => {
        return res.status(409).json({error: error});
      });
  } else {
    Petition.aggregate([
      {$unset: "signatures_by_constituency"},
      {$match: {state: query}},
    ])
      .then(petitions => {
        const editPetitionsYear = petitions.map(petition => {
          return {
            ...petition,
            created_at: moment(petition.closed_at).format("YYYY"),
          };
        });

        const selectedPetitions = editPetitionsYear.filter(petition =>
          years_range.includes(petition.created_at)
        );
        const groupPetitionByDepartMent = selectedPetitions.reduce((r, a) => {
          r[a.topic] = r[a.topic] || [];
          r[a.topic].push(a);
          return r;
        }, Object.create(null));

        const data = groupPetitionByDepartMent;
        return res.status(201).json(data);
      })
      .catch(error => {
        return res.status(409).json({error: error});
      });
  }
};
