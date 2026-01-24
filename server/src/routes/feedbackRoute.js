import express from 'express';
import {
    createFeedback,
    submitFeedback, 
    getFeedbackResults,
    closeForm,
}from '../controller/feedBackController.js';

const router = express.Router();

router.post('/feedback', createFeedback);
router.post('/feedback/:id/submit', submitFeedback);
router.get('/feedback/:id/results', getFeedbackResults);
router.post('/feedback/:id/close', closeForm);

export default router;