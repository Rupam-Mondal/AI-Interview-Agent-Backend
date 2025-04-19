import { GetInterviewByUserIdService } from "../Services/InterviewService.js";
import { GetCodeStep } from "./GPT.js";


export async function GetUserInterviewController(req , res){
    try {
        const userId = req?.user?.id;
        const response = await GetInterviewByUserIdService(userId);
        return res.json({
            success:true,
            message:"Data fetched successfully",
            data:response
        });
    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}  

export async function CodeStepController(req , res){
    try {
        const code = req.body.code;
        if(!code){
            return res.json({
                success:false,
                message:"Code is required"
            })
        }
        const data = await GetCodeStep(code);
        const animationSteps = JSON.parse(data);
        return res.json({
            success:true,
            message:"Data fetched successfully",
            data:animationSteps
        });
    } catch (error) {
        return res.json({
            success:false,
            message:"Something went wrong"
        })
    }
}