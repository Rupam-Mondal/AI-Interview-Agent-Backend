import client from "../Config/OpenAiConfig.js";

export async function Analysis(Object) {
    try {
        const response = await client.chat.completions.create({
            messages: [
                { role: "developer", content: "" },
                {
                    role: "user", content: `Analyse these answer with respect to question ${Object}
                                        write scope of improvements for each question, 
                                        do not write extra sentence ans also give marks out of 5` }
            ],
            model: "o3-mini"
        });

        return response.choices[0].message.content;
    } catch (error) {
        throw error;
    }
}