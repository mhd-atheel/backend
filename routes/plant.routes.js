import {addPlant, updatePlant, deletePlant, viewPlants, viewOnePlants} from "../controllers/plant.controller.js"
import express from 'express';

const router = express.Router();

router.get("/viewPlants", viewPlants);
router.get("/viewOnePlants/:id", viewOnePlants);
router.post("/addPlant", addPlant);
router.put("/updatePlant/:id", updatePlant);
router.delete("/deletePlant/:id", deletePlant);

export default router;