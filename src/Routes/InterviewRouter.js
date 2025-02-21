import express from 'express';
import { IsAuthenticated } from '../Middlewares/Authmiddleware.js';
import { GetUserInterviewController } from '../Controllers/InterviewController.js';
import { GetSampleQuestionController } from '../Controllers/QuestionsController.js';


const InterviewRouter = express.Router();
InterviewRouter.get('/userInterview', IsAuthenticated, GetUserInterviewController);
InterviewRouter.get('/samplequestion', IsAuthenticated, GetSampleQuestionController);

export default InterviewRouter;