import Technology from "../Schemas/Technology.js";

export async function GetSampleQuestionByTopicName(name){
    try {
        const response = await Technology.findOne({name:name});
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}