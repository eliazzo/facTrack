"use server"
import { mongoClient } from "./newClient"
import { processTranscript } from "../../api/openai/processTranscript"

export async function insertDocument() {
  try {
    await mongoClient.connect()
    console.log("Successfully connected to MongoDB")

    const database = mongoClient.db("facTrack")
    const transcripts = database.collection("transcripts")
    const doc = await processTranscript()

    await transcripts.insertOne(doc)
  } catch (error) {
    console.error(error)
  } finally {
    await mongoClient.close()
  }
}

// insertDocument()
