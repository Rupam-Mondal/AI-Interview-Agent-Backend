import { GetsampleQuestionsService, QuestionService } from "../Services/QuestionService.js";

export async function QuestionController(req , res){
    try {
        const questionObject = {
            topic:req.body.topic,
            experience:req.body.experience
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
        const name = req.body.topic;
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