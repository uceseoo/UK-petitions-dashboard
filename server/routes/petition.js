import express from "express";

const router = express.Router();

import {addPetition} from "../controllers/addPetition.js";
import {fetchMapData} from "../controllers/fetchMapData.js";
import {fetchPetitions} from "../controllers/fetchPetitions.js";
import {fetchBarGraphData} from "../controllers/barGraphData.js";
import {fetchLineChartData} from "../controllers/lineChartData.js";

router.get("/add", fetchMapData);

router.get("/get/map/geojson/:topic", fetchMapData);

router.post("/fetch/petitions", fetchPetitions);

router.post("/fetch/bar-graph/data", fetchBarGraphData);

router.get("/fetch/line-chart/data", fetchLineChartData);

export default router;
