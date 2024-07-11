import "dotenv/config"
import OpenAI from "openai"

import { authorize } from "../google-meet/authorize"
import { callGetTranscriptEntry } from "../google-meet/getTranscript"

type FormattedResponse = {
  title: string
  attendees: string
  "key discussion points": string
  actions: string
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  organization: "org-nYbqgo3O0LNnYYAoKAmApBfx",
  project: process.env.PROJECT_ID,
})

export async function processTranscript(): Promise<FormattedResponse> {
  console.log("process transcript function started")
  const transcription = await authorize()
    .then(callGetTranscriptEntry)
    .catch(console.error)
  const userMessage = `I will provide a transcript of a work meeting for founders and coders (a non-profit coding bootcamp based in London) \n
        
    Organise this meeting into useful notes. Be highly organised, using headers and bullet points. Give me the output as a single JSON object in the same format as the one I have included at the bottom. Capture the essential details of the meeting in the following format: \n
    The title should be a meeting title that is specific to the contents of the meeting. \n
    The attendees should be a list of everyone who attended the meeting. If you do not have enough data to accurately describe the attendees, put "unknown'. \n
    The discussion points should include all the key points of the meeting. Be specific and concise, only keep the most interesting and important parts. Include any open questions or unresolved items that require further discussion or decision-making and decisions made (including the rationale behind each decision ). \n
    The actions should be a bullet point list of the action items assigned to specific individuals, these are tasks that that person should carry out after the meeting based on the discussion. \n
    Make sure the JSON object is complete and contains all of the key value pairs that I have included in the example. Do not include any line breaks or newline (\n) characters. Review your response before sending it. \n 
    
    example output:

"""
{
"title": "curriculum meeting",
"attendees": "John, Paula, Mike",
"key discussion points" :  "Reviewed student progress and performance in the current cohort", "Discussed upcoming curriculum changes and improvements", "Addressed the need for additional support for struggling students",
"actions":  "John to conduct weekly check-ins with struggling students", "Mike to email all students with schedule changes", "Paula to create a new curriculum proposal"
}
"""

transcript: """${transcription}"""
`

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are an experienced admin lead. " },
      { role: "user", content: userMessage },
    ],
    max_tokens: 500,
  })

  const response = completion.choices[0].message.content

  if (!response) {
    throw new Error("The response from OpenAI is empty or null.")
  }

  let formattedResponse: FormattedResponse | undefined

  try {
    const cleanedResponse = response
      .replace(/^\s*```json/, "")
      .replace(/```\s*$/, "")
      .trim()

    formattedResponse = await JSON.parse(cleanedResponse)
  } catch (error) {
    console.error("Error parsing JSON response:", error)
  }

  if (!formattedResponse) {
    throw new Error("Failed to parse the formatted response as JSON")
  }

  return formattedResponse
}
