import { GetQuestionsInterview } from "../Apis/Gptapi.js";

export async function QuestionService({ topic, experience }){
    try {
        const response = await GetQuestionsInterview(topic , experience);
        console.log(typeof response);
        if (!response) {
            throw null;
        }
        const arr = response.split("\n");
        return arr;
    } catch (error) {
        console.log(error);
        throw error;
    }
}