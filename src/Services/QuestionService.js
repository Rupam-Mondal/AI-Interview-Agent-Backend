import { GetQuestionsInterview } from "../Apis/Gptapi.js";

export async function QuestionService({ topic, experience }){
    try {
        const response = await GetQuestionsInterview(topic , experience);
        console.log(typeof response);
        if (!response) {
            throw null;
        }
        const arr = [];
        let k = 0;
        let i = 0;
        while(i < response.length){
            if(response[i] != '/n'){
                arr[k] += response[i];
            }
            else{
                k++;
            }
            i++;
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}