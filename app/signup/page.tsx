import { redirect } from "next/navigation"
import AuthForm from "../components/AuthForm"
const client = require("../mongodb/newClient")
const bcrypt = require("bcrypt")

export default function SignUp() {
  async function signUp(formData: FormData) {
    "use server"
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    }
    const database = client.db("facTrack")
    const users = database.collection("users")
    const username = await data.username
    const hashedPassword = await bcrypt.hash(data.password, 10)

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
