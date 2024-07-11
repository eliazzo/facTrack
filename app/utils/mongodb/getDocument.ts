"use server"
import { client } from "./newClient"

export async function getDocument() {
  try {
    await client.connect()

    const database = client.db("facTrack")
    const transcripts = database.collection("transcripts")

    const cursor = transcripts.find({}).sort({ _id: -1 }).limit(1)
    for await (const doc of cursor) {
      const { _id, ...plainDoc } = doc
      return plainDoc
    }
  } finally {
    await client.close()
  }
}
