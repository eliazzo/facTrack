"use server"
import { mongoClient } from "./newClient"

export const getToken = async () => {
  const database = mongoClient.db("facTrack")
  const google_auth = database.collection("google_auth")

  /* this will eventually use the user_id to find the correct match */
  const docsCursor = google_auth.find({
    user_id: "the users id",
  })

  const docs = await docsCursor.toArray() // Convert cursor to array of documents
  console.log("Tokens from database: ", docs[0].token)
  return docs[0].token
}

// getToken()
