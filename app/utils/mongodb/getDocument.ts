"use server"
import { mongoClient } from "./newClient"

export async function getDocument() {
  try {
    await mongoClient.connect()

    const database = mongoClient.db("facTrack")
    const transcripts = database.collection("transcripts")

    const cursor = transcripts.find({}).sort({ _id: -1 }).limit(1)
    for await (const doc of cursor) {
      const { _id, ...plainDoc } = doc
      return plainDoc
    }
  } finally {
    await mongoClient.close()
  }
}
