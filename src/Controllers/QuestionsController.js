import { GetQuestionOnResume } from "../Apis/Gptapi.js";
import { AnalyseService, AskOurAiService, GetsampleQuestionsService, QuestionService } from "../Services/QuestionService.js";
import fs from 'fs/promises';

export async function QuestionController(req , res){
    try {
        const questionObject = {
            topic:req?.query?.topic,
            experience:req?.query?.experience
        }
        const userId = req?.user?.id;
        const response = await QuestionService(questionObject , userId);
        if(!response){
            throw null;
        }
        return res.json({
            success:true,
            message:"Quesstion fetched Successfully",
            data:response
        });
    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}

export async function SampleQuestionController(req , res){
    try {
        const object = {
            name:req?.body?.topic
        }
        const response = await GetsampleQuestionsService(object);
        if (!response) {
            throw null;
        }
        return res.json({
            success:true,
            message:"Questions fetched successfully",
            data:response
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}

export async function GetSampleQuestionController(req , res){
    try {
        const name = req?.query?.topic;
        const response = await GetsampleQuestionsService({name});
        if(!response){
            throw null;
        }
        return res.json({
            success:true,
            message:"Sample question fetched successfully",
            data:response
        })
    } catch (error) {
        return res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export async function AnalyseQuestionsController(req , res){
    try {
        const AnalysisObject = req.body.analysisObject;
        console.log(AnalysisObject)
        const response = await AnalyseService(AnalysisObject);
        if(!response) throw null;
        return res.json({
            success:true,
            message:"Analysis is successfull",
            data:response
        });
    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong"
        });
    }
}

export async function AskOurAiController(req , res){
    try {
        const UserQuestion = req?.query?.question;
        const response = await AskOurAiService(UserQuestion);
        return res.json({
            success:true,
            message:"Question answered successfully",
            data:response
        })
    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}

export async function getQuestionOnResume(req, res) {
    try {
        const pdfParse = (await import('pdf-parse/lib/pdf-parse.js')).default;
        const file = req?.file;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const buffer = await fs.readFile(file.path);
        const parsed = await pdfParse(buffer);
        const resumeText = parsed.text;

        const data = await GetQuestionOnResume(resumeText);
        if(!data) {
            throw null;
        }
        const questionsArray = data.split('\n\n');
        return res.json({
            success: true,
            message: "Questions fetched successfully",
            data: questionsArray
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error
        });
    }
}