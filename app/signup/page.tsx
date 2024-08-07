import { redirect } from "next/navigation"
import bcrypt from "bcrypt"

import AuthForm from "../components/AuthForm"
import { mongoClient } from "../utils/mongodb/newClient"

export default function SignUp() {
  async function signUp(formData: FormData) {
    "use server"
    const { username, password } = {
      username: formData.get("username"),
      password: formData.get("password"),
    }
    const database = mongoClient.db("facTrack")
    const users = database.collection("users")

    if (typeof username !== "string" || typeof password !== "string") {
      console.error("Invalid form data")
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

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
