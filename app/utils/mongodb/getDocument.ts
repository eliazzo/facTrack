"use server"
import { client } from "./newClient"

export async function getDocument() {
  try {
    const database = client.db("facTrack")
    const transcripts = database.collection("transcripts")

    const cursor = transcripts.find({}).sort({ _id: -1 }).limit(1)
    for await (const doc of cursor) {
      console.dir(doc)
      return doc
    }
  } finally {
    await client.close()
  }
}
