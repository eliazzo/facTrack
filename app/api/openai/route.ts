const { authorize, callGetTranscriptEntry } = require( "../google-meet/route.ts");
require('dotenv').config()
const OpenAI = require("openai");

const transcription = authorize().then(callGetTranscriptEntry).catch(console.error)



const openai = new OpenAI({
    authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    organization: "org-nYbqgo3O0LNnYYAoKAmApBfx",
    project: process.env.PROJECT_ID,
});


async function main() {
    const completion = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        prompt: `Translate the final returned value into shakespearean english: ${transcription}`
    });

    console.log(completion.choices[0].text)
}
// main();