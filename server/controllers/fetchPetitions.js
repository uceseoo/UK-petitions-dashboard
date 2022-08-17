import {readFile} from "fs/promises";

const petitions = JSON.parse(
  await readFile(new URL("../petitions.json", import.meta.url))
);

const filteredPetitions = petitions.filter(
  petition => petition.self !== undefined
);

//FUNCTION TO RETURN DATA BASED ON TOPIC/DEPARTMENT SELECTED
export const fetchPetitions = (req, res) => {
  const query = req.body.query;

  filteredPetitions.forEach(object => {
    delete object["signatures_by_constituency"];
  });

  const updatedPetitionsTopic = filteredPetitions.map(petition => {
    return {
      ...petition,
      topic: petition.departments[0]?.name.replace("Department for ", ""),
    };
  });

  const queriedPetitions =
    query === "all"
      ? updatedPetitionsTopic
      : updatedPetitionsTopic.filter(petition => {
          return petition.topic === query;
        });

  const groupPetitionByState = queriedPetitions.reduce((r, a) => {
    r[a.state] = r[a.state] || [];
    r[a.state].push(a);
    return r;
  }, Object.create(null));

  const groupPetitionByDepartMent = updatedPetitionsTopic.reduce((r, a) => {
    r[a.departments[0]?.name] = r[a.departments[0]?.name] || [];
    r[a.departments[0]?.name].push(a);
    return r;
  }, Object.create(null));

  const data = {
    state_grouped: groupPetitionByState,
    department_grouped: groupPetitionByDepartMent,
  };
  res.status(201).json(data);
};
