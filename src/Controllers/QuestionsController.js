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