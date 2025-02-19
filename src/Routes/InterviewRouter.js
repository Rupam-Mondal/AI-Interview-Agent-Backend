import express from 'express';
import { IsAuthenticated } from '../Middlewares/Authmiddleware.js';
import { GetUserInterviewController } from '../Controllers/InterviewController.js';


const InterviewRouter = express.Router();
InterviewRouter.get('/userInterview', IsAuthenticated, GetUserInterviewController);

export default InterviewRouter;