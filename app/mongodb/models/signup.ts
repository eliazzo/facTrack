"use server"

import { redirect } from "next/navigation"

const client = require("../newClient")
const bcrypt = require("bcrypt")

export default async function handler(formData: FormData) {
  async function test(formData: FormData) {
    "use server"
    const data = {
      user: formData.get("user") as string,
    }
    console.log(data)
    redirect("/")
  }

  // const database = client.db("facTrack")
  // const users = database.collection("users")
  // const hashedPassword = await bcrypt.hash(password, 10)
  // try {
  //   await users.insertOne({ formData.get.username, password: hashedPassword })
  //   console.log("new user created")
  // } catch (error) {
  //   console.log(error, { error: "User creation failed" })
  // }

  // return redirect("/login")
}
