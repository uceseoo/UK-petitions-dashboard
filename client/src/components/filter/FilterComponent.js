import {useState} from "react";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const topics = [
  "Home Office",
  "Department for Business, Energy and Industrial Strategy",
  "Department for Digital, Culture, Media and Sport",
  "Department for Transport",
  "Department of Health and Social Care",
  "Department for Education",
  "Foreign, Commonwealth & Development Office",
  "Ministry of Justice",
  "HM Treasury",
  "Cabinet Office",
  "Department for Levelling Up, Housing and Communities",
  "Department for International Trade",
  "Department for Environment, Food and Rural Affairs",
  "Department for Work and Pensions",
  "Office of the Leader of the House of Commons",
  "Ministry of Defence",
  "Office of the Secretary of State for Wales",
  "Office of the Secretary of State for Scotland",
  "Northern Ireland Office",
  "Attorney General's Office",
  "Unknown Topic",
];

const filteredTopics = topics.map(topic => {
  return topic.replace("Department for ", "").replace("Department of", "");
});

//N:B : MAKE MARKS DYNAMIC BASED ON NUMBER OF YEARS PRESENT IN PETITION DATA
const marks = [
  {
    value: 2020,
    label: 2020,
  },
  {
    value: 2021,
    label: 2021,
  },
  {
    value: 2022,
    label: 2022,
  },
];

const valuetext = value => {
  return `${value}`;
};

const FilterComponent = ({
  petitionTopic,
  setPetitionTopic,
  rangeValue,
  setRangeValue,
  petitionState,
  setPetitionState,
}) => {
  //const [petitionState, setPetitionState] = useState("all");

  const handleRangeChange = (event, newValue) => {
    setRangeValue(newValue);
    //console.log(newValue);
  };

  const handleStateChange = event => {
    setPetitionState(event.target.value);
  };

  const handleChangeTopic = event => {
    setPetitionTopic(event.target.value);
  };

  return (
    <div className="filter-component-container">
      <div className="filter-component-inner-container">
        <div className="filter-component-slider-container">
          <div className="slider-header-container">
            <span>Filter Petitions by Year</span>
          </div>
          <div className="slider-main-slider-container">
            <Slider
              getAriaLabel={() => "Year range"}
              value={rangeValue}
              onChange={handleRangeChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              marks={marks}
              min={2020}
              max={2022}
            />
          </div>
        </div>

        <div className="filter-by-state-container">
          <div className="filter-by-state-header-container">
            <span>Filter Petitions by State</span>
          </div>
          <div className="filter-by-state-contents-container">
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={petitionState}
              onChange={handleStateChange}
              row
            >
              <FormControlLabel value="all" control={<Radio />} label="All" />
              <FormControlLabel value="open" control={<Radio />} label="Open" />
              <FormControlLabel
                value="closed"
                control={<Radio />}
                label="Closed"
              />
              <FormControlLabel
                value="rejected"
                control={<Radio />}
                label="Rejected"
              />
            </RadioGroup>
          </div>
        </div>

        <div className="filter-by-topic-container">
          <div className="filter-by-topic-header-container">
            <span>Filter Petitions by Topics</span>
          </div>

          <div className="filter-by-topic-contents-container">
            <FormControl sx={{m: 1, width: 300}}>
              <InputLabel id="demo-simple-select-label" size="normal">
                Topic
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={petitionTopic}
                label="Age"
                onChange={handleChangeTopic}
              >
                {filteredTopics.map((topic, index) => (
                  <MenuItem key={index} value={topic}>
                    {topic}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
