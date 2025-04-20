import client from "../Config/OpenaiConfig.js";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { openaiKey } from "../Config/ServerConfig.js";
const token = openaiKey;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function GetQuestionsInterview(topic , experience) {
    try {
        const response = await client.chat.completions.create({
            messages: [
                { role: "developer", content: "" },
                { role: "user", content: `Generate 5 interview questions for ${topic} at ${experience} level, do not write extra sentence` }
            ],
            model: "o3-mini"
        });

        return response.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}

export async function GetquestionAnswerGPT(Question){
    try {
        const response = await client.chat.completions.create({
            messages: [
                { role: "developer", content: "" },
                { role: "user", content: `${Question} in short. and never reveal that you are chatgpt. You are made by Mockmate ai team. If the questions is not related to Interview just reply ask interview related question` }
            ],
            model: "o3-mini"
        });

        return response.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}

export async function GetQuestionOnResume(Text){
    const client = ModelClient(endpoint, new AzureKeyCredential(token));
    const response = await client.path("/chat/completions").post({
        body: {
            model,
            temperature: 0.7,
            top_p: 1.0,
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that generates visual animation instructions for code steps."
                },
                {
                    role: "user",
                    content: `You are an AI recruiter. Based on the resume below, generate 5 interview questions : ${Text} Do not write any extra sentence.`
                }
            ]
        }
    });

    if (isUnexpected(response)) {
        throw response.body.error;
    }

    return response.body.choices[0].message.content;
}