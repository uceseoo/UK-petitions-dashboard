import {readFile} from "fs/promises";
import moment from "moment";

const petitions = JSON.parse(
  await readFile(new URL("../petitions.json", import.meta.url))
);

const filteredPetitions = petitions.filter(
  petition => petition.self !== undefined
);

export const fetchLineChartData = (req, res) => {
  filteredPetitions.forEach(object => {
    delete object["signatures_by_constituency"];
  });

  const editPetitionsYear = filteredPetitions.map(petition => {
    return {
      ...petition,
      created_at: moment(petition.created_at).format("YYYY"),
    };
  });

  const years_range = ["2020", "2021", "2022"];

  const debatedPetitions = editPetitionsYear.filter(
    petition => petition.state === "closed"
  );

  const filteredPetitionsByYearRange = debatedPetitions.filter(petition =>
    years_range.includes(petition.created_at)
  );

  const groupPetitionsByDepartment = filteredPetitionsByYearRange.reduce(
    (r, a) => {
      r[a.departments[0]?.name] = r[a.departments[0]?.name] || [];
      r[a.departments[0]?.name].push(a);
      return r;
    },
    {}
  );

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

  // const hello = groupedPetitionDepartmentByYear.map(obj => {
  //   const lineData = Object.entries(obj).map(([key, value]) => {
  //     return Object.entries(value).map(([key, value]) => {
  //       return value.length;
  //     });
  //   });

  //   const data = {
  //     label: Object.keys(obj)[0],
  //     data: lineData[0],
  //   };
  //   return data;
  // });

  const data = {
    labels: labels,
    chartData: groupedPetitionDepartmentByYear,
  };

  res.status(201).json(data);
};
