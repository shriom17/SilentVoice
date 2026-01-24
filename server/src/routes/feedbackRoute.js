import express from 'express';
import {
    getAllFeedback,
    createFeedback,
    submitFeedback, 
    getFeedbackResults,
    closeForm,
    toggleFormStatus,
}from '../controller/feedBackController.js';

const router = express.Router();

router.get('/feedback', getAllFeedback);
router.post('/feedback', createFeedback);
router.post('/feedback/:id/submit', submitFeedback);
router.get('/feedback/:id/results', getFeedbackResults);
router.post('/feedback/:id/close', closeForm);
router.patch('/feedback/:id/toggle', toggleFormStatus);

export default router;