const { authorize } = require("../google-meet/authorize")
const { callGetTranscriptEntry } = require("../google-meet/getTranscript")
require('dotenv').config()
const OpenAI = require("openai");
const dummyTranscript = require("./dummyTranscript")

// const transcription = authorize().then(callGetTranscriptEntry).catch(console.error)

const openai = new OpenAI({
    authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    organization: "org-nYbqgo3O0LNnYYAoKAmApBfx",
    project: process.env.PROJECT_ID,
});

// console.log(dummyTranscript)


async function main() {
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: "user", content: `You are an experienced admin lead. This is a transcript of a work meeting for founders and coders (a non-profit coding bootcamp based in London): ${dummyTranscript}
        
        
        Organise this meeting into useful notes. Be highly organised, using headers and bullet points. Give me the output in a json object in the same format as the one I have included at the bottom. capture the 
        essential details of the meeting in the following format. The title should be a meeting title that is specific to the contents of the meeting. The attendees should be a string of everyone who 
        attended the meeting. The discussion points should include all the key points of the meeting. be specific and concise, only keep the most interesting and important parts. Include any open 
        questions or unresolved items that require further discussion or decision-making and decisions made (including the rationale behind each decision ). The actions should be a bullet point list 
        of the action items assigned to specific individuals, these are tasks that that person should carry out after the meeting based on the discussion. Make sure the object is complete and contains 
        every property, including the "actions" property, that I have included in the example. Review your json object before sending it.
        Here is the example output

{
title: "curriculum meeting",
attendees: "John, Paula, Mike",
"key discussion points" :  "Reviewed student progress and performance in the current cohort  \n' - Discussed upcoming curriculum changes and improvements  \n - Addressed the need for additional support for struggling students",
actions:  "- John to conduct weekly check-ins with struggling students \n - Mike to email all students with schedule changes \n - Paula to create a new curriculum proposal"
}
`}],
max_tokens: 500,
  });

    console.log(completion.choices[0])
}
main();