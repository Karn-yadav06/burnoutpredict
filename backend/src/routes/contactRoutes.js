import express from 'express';
import { createContactRequest, getContactRequests } from '../controllers/contactController.js';
import { contactValidators } from '../middleware/validationMiddleware.js';

const router = express.Router();

router.post('/', contactValidators, createContactRequest);
router.get('/', getContactRequests);

export default router;
