import client from "../Config/OpenAiConfig.js";

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