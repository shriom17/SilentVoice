import express from 'express';
import cors from 'cors';
import feedbackRoute from './src/routes/feedbackRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', feedbackRoute);

export default app;