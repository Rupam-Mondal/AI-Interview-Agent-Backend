import express from 'express';
import { IsAuthenticated } from '../Middlewares/Authmiddleware.js';
import { GetUserInterviewController } from '../Controllers/InterviewController.js';
import { AnalyseQuestionsController, AskOurAiController, getQuestionOnResume, GetSampleQuestionController } from '../Controllers/QuestionsController.js';
import upload from '../Config/MulterConfig.js';


const InterviewRouter = express.Router();
InterviewRouter.get('/userInterview', IsAuthenticated, GetUserInterviewController);
InterviewRouter.get('/samplequestion', IsAuthenticated, GetSampleQuestionController);
InterviewRouter.post('/analysis', IsAuthenticated, AnalyseQuestionsController);
InterviewRouter.get('/askourai', IsAuthenticated, AskOurAiController);
InterviewRouter.post('/resume/pdf', upload.single('resume'), getQuestionOnResume);

export default InterviewRouter;