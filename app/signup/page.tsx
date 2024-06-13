import { redirect } from "next/navigation"
import bcrypt from "bcrypt"

import AuthForm from "../components/AuthForm"
import { client } from "../utils/newClient"

export default function SignUp() {
  async function signUp(formData: FormData) {
    "use server"
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    }
    const database = client.db("facTrack")
    const users = database.collection("users")

    if (
      typeof data.username !== "string" ||
      typeof data.password !== "string"
    ) {
      console.error("Invalid form data")
      return
    }

    const username = data.username
    const hashedPassword = bcrypt.hash(data.password, 10)

    try {
      await users.insertOne({ username, password: hashedPassword })
      console.log("new user created")
    } catch (error) {
      console.log(error, { error: "User creation failed" })
    }

    redirect("/login")
  }

  return (
    <AuthForm onSubmit={signUp} title={"Sign up page"} action={"Sign up"} />
  )
}
