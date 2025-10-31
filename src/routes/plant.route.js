import {createPlant} from '../controllers/plant/plant.controller.js';
import express from 'express';

const router=express.Router();
router.post('/createPlant',createPlant);

export default router;