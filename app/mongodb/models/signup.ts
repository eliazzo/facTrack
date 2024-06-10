"use server"
const client = require("../newClient")
const bcrypt = require("bcrypt")

export default async function handler(username: string, password: string) {
  console.log({ username, password })
  //   const database = client.db("facTrack")
  //   const users = database.collection("users")
  //   const hashedPassword = await bcrypt.hash(password, 10)
  //   try {
  //     await users.insertOne({ username, password: hashedPassword })
  //     console.log("new user created")
  //   } catch (error) {
  //     console.log({ error: "User creation failed" })
  // }
}
