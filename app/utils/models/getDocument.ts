import { client } from "../mongodb/newClient"

async function getDocument() {
  try {
    const database = client.db("facTrack")
    const transcripts = database.collection("transcripts")

    const cursor = await transcripts.find({}).sort({ _id: -1 }).limit(1)
    for await (const doc of cursor) {
      console.dir(doc)
    }
  } finally {
    await client.close()
  }
}
getDocument().catch(console.dir)
