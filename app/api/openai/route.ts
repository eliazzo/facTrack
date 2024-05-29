// import { callGetTranscriptEntry } from "../google-meet/route";
require('dotenv').config()
const OpenAI = require("openai");

const openai = new OpenAI({
    authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    organization: "org-nYbqgo3O0LNnYYAoKAmApBfx",
    project: process.env.PROJECT_ID,
});


async function main() {
    const stream = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: "Say this is a test" }],
        stream: true,
    });
    for await (const chunk of stream) {
        process.stdout.write(chunk.choices[0]?.delta?.content || "");
    }
}

console.log(main());