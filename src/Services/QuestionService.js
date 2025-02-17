import { GetQuestionsInterview } from "../Apis/Gptapi.js";

export async function QuestionService({ topic, experience }){
    try {
        const response = await GetQuestionsInterview(topic , experience);
        console.log(response);
        if(!response){
            throw null;
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}