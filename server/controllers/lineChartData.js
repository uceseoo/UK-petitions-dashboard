import moment from "moment";

import Petition from "../models/petition.js";

export const fetchLineChartData = (req, res) => {
  Petition.aggregate([{$unset: "signatures_by_constituency"}])
    .then(petitions => {
      const editPetitionsYear = petitions.map(petition => {
        return {
          ...petition,
          created_at: moment(petition.closed_at).format("YYYY"),
        };
      });

      const years_range = ["2020", "2021", "2022"];

      // const debatedPetitions = editPetitionsYear.filter(
      //   petition => petition.state === "closed"
      // );

      const filteredPetitionsByYearRange = editPetitionsYear.filter(petition =>
        years_range.includes(petition.created_at)
      );

      const groupPetitionsByDepartment = filteredPetitionsByYearRange.reduce(
        (r, a) => {
          r[a.topic] = r[a.topic] || [];
          r[a.topic].push(a);
          return r;
        },
        {}
      );

      const AllDebatedPetitionsGroupedByYear =
        filteredPetitionsByYearRange.reduce((r, a) => {
          r[a.created_at] = r[a.created_at] || [];
          r[a.created_at].push(a);
          return r;
        }, Object.create(null));

      const labels = ["2020", "2021", "2022"];

      const groupedPetitionDepartmentByYear = Object.entries(
        groupPetitionsByDepartment
      ).map(([key, value]) => {
        const newValues = value.reduce((r, a) => {
          r[a.created_at] = r[a.created_at] || [];
          r[a.created_at].push(a);
          return r;
        }, Object.create(null));

        return {[key]: newValues};
      });

      const numberOfDebatedPetitionsYearly = labels.map(label => {
        return {
          year: label,
          number_of_petitions:
            AllDebatedPetitionsGroupedByYear[`${label}`]?.length,
        };
      });

      const data = {
        labels: labels,
        chartData: groupedPetitionDepartmentByYear,
        petitions: numberOfDebatedPetitionsYearly,
      };

      return res.status(201).json(data);
    })
    .catch(error => {
      return res.status(409).json({error: error});
    });
};
