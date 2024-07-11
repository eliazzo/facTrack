"use server"
import { client } from "./newClient"

export async function insertToken() {
  try {
    await client.connect()

    const database = client.db("facTrack")
    const transcripts = database.collection("googleAuth")
    const doc = /* token data created by google */ {
      username:
        /* or _id from users table to identify the user at later login */ "beth",
      token: "token value provided by google",
    }
    await transcripts.insertOne(doc)
  } finally {
    await client.close()
  }
}
