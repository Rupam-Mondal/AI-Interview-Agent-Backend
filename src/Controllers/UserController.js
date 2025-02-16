import { SignUpService } from "../Services/UserService.js";

export async function SignUpController(req , res){
    try {
        const Object = {
            username:req.body.username,
            password:req.body.password,
            email:req.body.email
        };
        const response = await SignUpService(Object);
        if(!response){
            throw null;
        }
        return res.json({
            success:true,
            message:"Signed up successfully",
            data:response
        });
    } catch (error) {
        return res.json({
            success:false,
            message:"Signed up failed"
        });
    }
}