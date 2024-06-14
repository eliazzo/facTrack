import "dotenv/config"
import { client } from "./newClient"
import processTranscript from "../../api/openai/route"

async function insertDocument() {
  try {
    await client.connect()

    const database = client.db("facTrack")
    const transcripts = database.collection("transcripts")
    const doc = await processTranscript()

    await transcripts.insertOne(doc)
  } finally {
    await client.close()
  }
}
insertDocument().catch(console.dir)
