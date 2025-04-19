import client from "../Config/OpenaiConfig.js";

export async function Analysis(Object) {
    try {
        const response = await client.chat.completions.create({
            messages: [
                { role: "developer", content: "" },
                {
                    role: "user", content: `Analyse these answer with respect to question ${JSON.stringify(Object)}
                                        write scope of improvements for each question, and answer of each question in short, 
                                        do not write extra sentence and also give marks out of 5, also give total marks at end, also attach the topic name at last` }
            ],
            model: "o3-mini"
        });

        return response.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}