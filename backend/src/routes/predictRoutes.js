import express from 'express';
import { createPrediction, getPredictions, deletePrediction } from '../controllers/predictController.js';
import { predictionValidators } from '../middleware/validationMiddleware.js';
import { optionalAuthenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', optionalAuthenticateToken, predictionValidators, createPrediction);
router.get('/', optionalAuthenticateToken, getPredictions);
router.delete('/:id', optionalAuthenticateToken, deletePrediction);

export default router;
