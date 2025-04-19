import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { openaiKey } from "../Config/ServerConfig.js";

// Azure/OpenAI setup
const token = openaiKey;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

/**
 * Generates step-by-step animation instructions for a given code snippet
 * @param {string} code - The source code to visualize
 * @returns {Promise<string>} JSON array string of animation steps
 */
export async function GetCodeStep(code) {
    const client = ModelClient(endpoint, new AzureKeyCredential(token));

    const prompt = `
You are helping create animated video scenes to explain code.

Given a piece of code, break it into step-by-step explanations and generate animation instructions.

Each step must be an object with:
- "step": Step number
- "title": A short step title
- "description": A simple explanation of what's happening
- "animation": {
    "type": one of: "variable_declaration", "loop", "condition", "function_call", "assignment", "console_output", "generic_text",
    "objects": [involved variables, functions, etc],
    "details": {
        "value": string or number,
        "position": string (e.g., "center", "leftTop", "consoleArea"),
        "effect": string (e.g., "fadeIn", "highlight", "showArrow")
    }
}
- "narration": A sentence for voiceover

Return ONLY a JSON array. No extra commentary.

Here is the code:
\`\`\`js
${code}
\`\`\`
  `.trim();

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
                    content: prompt
                }
            ]
        }
    });

    if (isUnexpected(response)) {
        throw response.body.error;
    }

    return response.body.choices[0].message.content;
}
