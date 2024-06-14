import "dotenv/config"
import { client } from "./newClient"

async function insertDocument() {
  try {
    await client.connect()

    const database = client.db("facTrack")
    const transcripts = database.collection("transcripts")
    // replace with processed data returned by openai
    const doc = {
      title: "Project progress weekly check-in",
      attendees: "Beth, Tavie, Jess",
      key_discussion_points: "",
      actions:
        "- share callouts on Discord \n - reach out to all women/non-binary people on airtable and offer them the support circles as well as those who previously attended support circles \n - Have a mailing list \n - save the date \n - Send out Safeguarding details for all mentors",
    }

    const result = await transcripts.insertOne(doc)
  } finally {
    await client.close()
  }
}
insertDocument().catch(console.dir)
