import client from "../Config/OpenaiConfig.js";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { openaiKey } from "../Config/ServerConfig.js";
const token = openaiKey;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function Analysis(Object) {
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
                        content: `Analyse these answer with respect to question ${JSON.stringify(Object)}
                                        write scope of improvements for each question, and answer of each question in short, 
                                        do not write extra sentence and also give marks out of 5, also give total marks at end, also attach the topic name at last`
                    }
                ]
            }
        });
    
        if (isUnexpected(response)) {
            throw response.body.error;
        }
    
        return response.body.choices[0].message.content;
}