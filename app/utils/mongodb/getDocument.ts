"use server"
import { client } from "./newClient"

export async function getDocument() {
  try {
    const database = client.db("facTrack")
    const transcripts = database.collection("transcripts")

    const cursor = await transcripts.find({}).sort({ _id: -1 }).limit(1)
    for await (const doc of cursor) {
      return doc
    }
  } catch (error) {
    console.error(error)
  } finally {
    await client.close()
  }
}
getDocument().catch(console.dir)
