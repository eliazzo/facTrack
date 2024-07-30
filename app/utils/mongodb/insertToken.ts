"use server"
import { mongoClient } from "./newClient"

export const insertToken = async (token: string) => {
  const database = mongoClient.db("facTrack")
  const google_auth = database.collection("google_auth")
  const doc = {
    user_id: "the users id",
    token: token,
  }

  await google_auth.insertOne(doc)
}
