import User from "../Schemas/User.js";

export async function CreateUser(UserObject){
    try {
        const response = await User.create(UserObject);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}