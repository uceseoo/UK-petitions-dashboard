import {readFile} from "fs/promises";
import moment from "moment";

const petitions = JSON.parse(
  await readFile(new URL("../petitions.json", import.meta.url))
);

const filteredPetitions = petitions.filter(
  petition => petition.self !== undefined
);

filteredPetitions.forEach(object => {
  delete object["signatures_by_constituency"];
});

const updatedPetitionsTopic = filteredPetitions.map(petition => {
  return {
    ...petition,
    topic: petition.departments[0]?.name.replace("Department for ", ""),
  };
});

//FUNCTION TO RETURN DATA BASED ON TOPIC/DEPARTMENT SELECTED
export const fetchBarGraphData = (req, res) => {
  //console.log(req.body.range);

  const query = req.body.query;

  //console.log(query);

  const editPetitionsYear = updatedPetitionsTopic.map(petition => {
    return {
      ...petition,
      created_at: moment(petition.created_at).format("YYYY"),
    };
  });

  const years_range = ["2020", "2021", "2022"];

  //const years = editPetitionsYear.map(a => a.created_at);

  const debatedPetitions = editPetitionsYear.filter(
    petition => petition.state === "closed"
  );

  // const queriedPetitions = debatedPetitions.filter(petition => {
  //   const topic = query === "all" ? null : query;
  //   return petition.topic === topic;
  // });

  const queriedPetitions =
    query === "all"
      ? debatedPetitions
      : debatedPetitions.filter(petition => {
          return petition.topic === query;
        });

  const filteredPetitionsByYearRange = queriedPetitions.filter(petition =>
    years_range.includes(petition.created_at)
  );

  const groupPetitionsByYear = filteredPetitionsByYearRange.reduce((r, a) => {
    r[a.created_at] = r[a.created_at] || [];
    r[a.created_at].push(a);
    return r;
  }, Object.create(null));

  // const years = filteredPetitionsByYearRange.map(a => a.created_at);

  // const labels = years.filter((c, index) => {
  //   return years.indexOf(c) === index;
  // });

  const data = {
    labels: years_range,
    graphData: years_range.map(label => {
      return groupPetitionsByYear[`${label}`]?.length;
    }),
  };

  res.status(201).json(data);
};
