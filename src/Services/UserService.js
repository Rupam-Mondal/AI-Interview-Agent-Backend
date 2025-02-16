import { CreateUser } from "../Repositories/UserRepository.js";

export async function SignUpService(UserObject) {
    try {
        const response = await CreateUser(UserObject);
        if(!response){
            throw null;
        }
        return response;
    } catch (error) {
        throw error;
    }
}