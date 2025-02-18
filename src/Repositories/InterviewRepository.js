import Interview from "../Schemas/Interview.js";

export async function Create(InterviewObject){
    try {
        const response = await Interview.create(InterviewObject);
        return response;
    } catch (error) {
        throw error;
    }
}

export async function GetInterviewById(Id){
    try {
        const response = await Interview.findById(Id);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}