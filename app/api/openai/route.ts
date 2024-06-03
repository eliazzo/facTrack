const { authorize, callGetTranscriptEntry } = require( "../google-meet/route.ts");
require('dotenv').config()
const OpenAI = require("openai");
const dummyTranscript = require("./dummyTranscript")

// const transcription = authorize().then(callGetTranscriptEntry).catch(console.error)



const openai = new OpenAI({
    authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    organization: "org-nYbqgo3O0LNnYYAoKAmApBfx",
    project: process.env.PROJECT_ID,
});


async function main() {
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: "system", content: `Outline the action points from the following meeting transcript: ${dummyTranscript}` }],
  });

    console.log(completion.choices[0])
}
main();