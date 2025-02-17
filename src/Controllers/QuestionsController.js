import { QuestionService } from "../Services/QuestionService.js";

export async function QuestionController(req , res){
    try {
        const questionObject = {
            topic:req.body.topic,
            experience:req.body.experience
        }
        const response = await QuestionService(questionObject);
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