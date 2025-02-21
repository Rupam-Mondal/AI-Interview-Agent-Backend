import { GetQuestionsInterview } from "../Apis/Gptapi.js";
import { CreateInterview } from "../Repositories/InterviewRepository.js";
import { GetSampleQuestionByTopicName } from "../Repositories/QuestionRepository.js";
import { GetUserById } from "../Repositories/UserRepository.js";

export async function QuestionService({ topic, experience }, userId){
    try {
        const response = await GetQuestionsInterview(topic , experience);
        console.log(typeof response);
        if (!response) {
            throw null;
        }
        const arr = response.split("\n");
        const InterviewObject = {
            Topic:topic,
            level:experience,
            user:userId,
            questions:arr
        }
        const InterviewResponse = await CreateInterview(InterviewObject);
        const User = await GetUserById(userId);
        User.Interviews.push(InterviewResponse._id);
        await User.save();
        return arr;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function GetsampleQuestionsService({name}){
    try {
        const response = await GetSampleQuestionByTopicName(name);
        if(!response){
            throw null;
        }
        return response;
    } catch (error) {
        throw error;
    }
}