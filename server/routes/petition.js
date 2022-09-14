import express from "express";

const router = express.Router();

import {fetchMapData} from "../controllers/fetchMapData.js";
import {fetchBarGraphData} from "../controllers/barGraphData.js";
import {fetchLineChartData} from "../controllers/lineChartData.js";
import {
  groupedByDepartment,
  groupedByState,
} from "../controllers/fetchPieChartData.js";
import {fetchPetitions} from "../controllers/fetchPetitions.js";
import {updtatePage, updatePetitons} from "../controllers/updatePetitions.js";
import {getPetitionCount} from "../controllers/getPetitionCount.js";
import {getLastUpdatedPage} from "../controllers/getLastUpdatedPage.js";

router.post("/get/map/geojson/:topic", fetchMapData);

router.post("/fetch/pie-chart/data/state", groupedByState);

router.post("/fetch/pie-chart/data/department", groupedByDepartment);

router.post("/fetch/bar-graph/data", fetchBarGraphData);

router.get("/fetch/line-chart/data", fetchLineChartData);

router.post("/fetch/petitions", fetchPetitions);

router.post("/update/petitions", updatePetitons);

router.post("/update/page", updtatePage);

router.get("/get/petition/count/:state", getPetitionCount);

router.get("/get/last/updated/page", getLastUpdatedPage);

export default router;
